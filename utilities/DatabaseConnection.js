import { openDatabase } from 'expo-sqlite';


export default class DatabaseConnection {

    //TODO Singleton with prepare

    constructor() {
        const dbname = "equiday_db.sqlite"

        this.db = openDatabase(dbname)

        // Check if Preparation is necessary
        this.db.transaction(
            tx => {
                tx.executeSql(
                    "SELECT name FROM sqlite_master WHERE type='table';",
                    [],
                    (tx, results) => {
                        if (results.rows.length == 0) {
                            this.prepare()
                            this.createExercises()
                            this.insertPlaceholderData()
                        }
                    },
                    (tx, error) => {
                        console.log(error) // TODO debug only
                    }
                )
            },
        )

    }

    /*
    componentWillUnmount(){
        this.state.db._db.close()
    }*/


    executeBatch(sql) { // TODO debug only
        this.db.transaction(
            tx => {
                sql.map((value) =>
                    tx.executeSql(
                        value,
                        [],
                        (tx, results) => {
                            //console.log("Query successfull")
                            //console.log(results)
                        },
                        (tx, error) => {
                            console.log("Could not execute query: " + error);
                        }
                    )
                )
            },
            error => {
                console.log("Transaction error: " + error);
            },
            () => {
                console.log("Transaction done ");
            }
        )
    }

    getPlansForDay(day, onSuccess, onError){
        this.db.transaction(
            tx => {
                tx.executeSql(
                    "SELECT * FROM plan p \
                    LEFT OUTER JOIN horse h \
                    ON p.horse_id = h.horse_id \
                    WHERE p.date = ?;",
                    [day],
                    (tx, result) => {
                        let todaysPlans = []
                        result.rows._array.map((value) => {
                            todaysPlans.push({
                                id: value.plan_id,
                                horse: value.nick,
                                goal: value.goal
                            })
                        })
                        onSuccess(tx, todaysPlans)
                    },
                    onError
                )
            }
        )
    }

    getAllHorses(onSuccess, onError){

        this.db.transaction(
            tx => {
                tx.executeSql(
                    "SELECT * FROM horse;",
                    [],
                    (tx, result) => {
                        let allHorses = []
                        if(result.rows.length == 0){
                            // TODO
                        }
                        else {
                            result.rows._array.map((value) => {
                                allHorses.push({id: value.horse_id, name: value.nick})
                            })
                        }
                        onSuccess(tx, allHorses)
                    },
                    onError
                )
            }
        )

    }

    getAllCategories(onSuccess, onError){
        
        this.db.transaction(
            tx => {
                tx.executeSql(
                    `SELECT * FROM categoryLookup
                    WHERE language_id = 1;`, // TODO Sprache flexibel
                    [],
                    (tx, result) => {
                        let allCategories = []
                        if(result.rows.length == 0){
                            // TODO
                        }
                        else {
                            result.rows._array.map((value) => {
                                allCategories.push({id: value.category_id, name: value.category_name})
                            })
                        }
                        onSuccess(tx, allCategories)
                    },
                    onError
                )
            }
        )

    }

    getAllExercises(onSuccess, onError){
        
        this.db.transaction(
            tx => {
                tx.executeSql(
                    `SELECT * FROM exercise e
                    INNER JOIN exerciseLookup el
                    ON e.exercise_id = el.exercise_id
                    WHERE el.language_id = 1`, // TODO flexibel für Sprache gestalten
                    [],
                    (tx, result) => {
                        let allExercises = []
                        if(result.rows.length == 0){
                            // TODO
                        }
                        else {
                            result.rows._array.map((value) => {
                                allExercises.push({id: value.exercise_id, name: value.exercise_name, category_id: value.category_id})
                            })
                        }
                        onSuccess(tx, allExercises)
                    },
                    onError
                )
            }
        )

    }



    getPlanMeta(id, onSuccess, onError) {
        this.db.transaction(
            tx => {
                tx.executeSql(
                    ` SELECT * FROM plan p
                    LEFT OUTER JOIN plan_category pc
                    ON p.plan_id = pc.plan_id
                    LEFT OUTER JOIN categoryLookup cat
                    ON cat.category_id = pc.category_id
                    LEFT OUTER JOIN horse h
                    ON p.horse_id = h.horse_id 
                    WHERE p.plan_id = ?
                    ;`, // TODO Sprache flexibel 
                    [id],
                    (tx, result) => {
                        let jsonResult = {}
                        if (result.rows.length == 0) {
                            // TODO blank initialize
                        }
                        else {
                            let entry = result.rows.item(0)
                            let selectedCategories = []
                            result.rows._array.map((value) => { 
                                if(value.category_id != null){
                                    selectedCategories.push({ id: value.category_id, name: value.category_name }) 
                                }
                            })
                            jsonResult.headData = {
                                date: entry.date, 
                                durationHour: (Math.floor(entry.duration / 60)).toString(),
                                durationMinute: (entry.duration % 60).toString(),
                                horse: { nick: entry.nick, id: entry.horse_id },
                                selectedCategories: selectedCategories,
                                goal: entry.goal
                            }
                            jsonResult.footData = {
                                riderMood: entry.riderMood,
                                horseMood: entry.horseMood,
                                commentary: entry.plan_commentary
                            }
                        }
                        onSuccess(tx, jsonResult)
                    },
                    onError
                )
            },
        )

    }

    getPlanExercises(id, onSuccess, onError) {
        this.db.transaction(
            tx => {
                tx.executeSql(
                    ` SELECT * FROM plan p
                    LEFT OUTER JOIN plan_exercise pe
                    ON p.plan_id = pe.plan_id
                    LEFT OUTER JOIN exercise e
                    ON pe.exercise_id = e.exercise_id
                    LEFT OUTER JOIN exerciseLookup el
                    ON e.exercise_id = el.exercise_id 
                    WHERE p.plan_id = ?
                    ;`, // TODO Sprache flexibel 
                    [id],
                    (tx, result) => {
                        let jsonResult = {}
                        if (result.rows.length == 0) {
                            // TODO blank initialize
                        }
                        else {
                            jsonResult.entryData = []
                            result.rows._array.map((value) => {
                                if(value.exercise_id != null){
                                    jsonResult.entryData.push({
                                        id: value.exercise_id,
                                        exercise: value.exercise_name,
                                        done: value.done,
                                        succeeded: value.succeeded,
                                        improved: value.improved,
                                        repeat: value.repeat,
                                        commentary: value.exercise_commentary,
                                        category_id: value.category_id
                                    })
    
                                }
                            })
                        }
                        onSuccess(tx, jsonResult)
                    },
                    onError
                )
            },
        )

    }


    savePlanMeta(plan_id, dataHead, dataFoot, onSuccess, onError){

        let duration = parseInt(dataHead.durationHour)*60+parseInt(dataHead.durationMinute)
        if(isNaN(duration)){
            duration = null
        }
        this.db.transaction(
            tx => {
                tx.executeSql(
                    "REPLACE INTO plan VALUES(?, ?, ?, ?, ?, ?, ?, ?);",
                    [plan_id,
                    dataHead.date,
                    duration, 
                    dataHead.goal,
                    dataFoot.riderMood,
                    dataFoot.horseMood,
                    dataFoot.commentary,
                    dataHead.horse.id],
    
                )
                tx.executeSql(
                    "DELETE FROM plan_category WHERE plan_id = ?;",
                    [plan_id],
                )
                dataHead.selectedCategories.map((value) =>
                tx.executeSql(
                    "INSERT INTO plan_category VALUES(?, ?);",
                    [plan_id,
                    value.id],
                )
                )
            },
            onError,
            onSuccess
        )
    }



    savePlanEntry(plan_id, dataEntry, onSuccess, onError){

        console.log("entered")

        this.db.transaction(
            tx => {
                tx.executeSql(
                    "DELETE FROM plan_exercise WHERE plan_id = ?;",
                    [plan_id]
                )
                dataEntry.map((value) => {
                    tx.executeSql(
                    'INSERT INTO plan_exercise VALUES (?, ?, ?, ?, ?, ?, ?);',
                    [plan_id, 
                    value.id, 
                    value.done, 
                    value.succeeded,
                    value.improved,
                    value.repeat,
                    value.commentary],
                ) }
                )
            },
            onError,
            onSuccess
        )

    }

    createPlan(onSuccess, onError){
        this.db.transaction(
            tx => {
                tx.executeSql(
                    'INSERT INTO plan DEFAULT VALUES;',
                    []
                )
                tx.executeSql(
                    'SELECT last_insert_rowid() as "id";',
                    [],
                    (tx, result) => {
                        onSuccess(tx, result.rows.item(0).id)
                    },
                    onError
                )
            }
        )
    }


    insertPlaceholderData() {
        const stmt = [
            'INSERT INTO horse VALUES(NULL, "Pedro", "Charly", NULL, "18.08.2011", "g", NULL, 156, 527, NULL, NULL, NULL, NULL, "");',
            'INSERT INTO horse VALUES(NULL, "Snowwhite", "Snow", NULL, "18.08.2011", "g", NULL, 156, 527, NULL, NULL, NULL, NULL, "");',
            'INSERT INTO plan VALUES(NULL, "02.07.2020", 75, "Hinterhand aktivieren", 2, 3, "Lief relativ gut...", 1);',
            'INSERT INTO plan_category VALUES(1, 1);',
            'INSERT INTO plan_exercise VALUES(1, 4, 1, 2, "+", "A", "Das wollte ich unbedingt wiederholen.");',
        ]

        this.executeBatch(stmt)
    }


    createExercises() {

        const exercisesStmt = [
            'INSERT INTO exercise VALUES(NULL, NULL, 1, 3, 2, 1, 2, 1, 3, 2, 1, 2, 0, 0, 3);',
            'INSERT INTO exerciseLookup VALUES(1, 1, "Acht", "Die Verbindung zweier Volten zu einer an einem Stück gerittenen Hufschlagfigur in Form einer Acht.");',
            'INSERT INTO exercise VALUES(NULL, NULL, 1, 3, 2, 1, 2, 1, 3, 2, 1, 2, 0, 0, 8);',
            'INSERT INTO exerciseLookup VALUES(1, 2, "Handpferd", "Ein Pferd wird geritten, während das andere, zum Beispiel am Halfter, als Handpferd mitgenommen wird.");',
            'INSERT INTO exercise VALUES(NULL, NULL, 1, 3, 3, 2, 2, 1, 2, 3, 1, 2, 0, 0, 6);',
            'INSERT INTO exerciseLookup VALUES(1, 3, "Angaloppieren", "Der Übergang aus dem Halten oder aus dem Rückwärtsrichten, dem Schritt oder Trab in den Galopp.");',
            'INSERT INTO exercise VALUES(NULL, NULL, 0, 1, 0, 0, 0, 0, 1, 3, 4, 4, 0, 0, 1);',
            'INSERT INTO exerciseLookup VALUES(1, 4, "Kompliment", "Zirsensische Übung, die schon etwas mehr Erfahrung benötigt.");',
            'INSERT INTO exercise VALUES(NULL, NULL, 3, 4, 3, 2, 5, 2, 2, 3, 2, 2, 0, 0, 2);',
            'INSERT INTO exerciseLookup VALUES(1, 5, "Stellung und Biegung im Zirkel", "Grundlagenübung und wichtig für die Geraderichtung.");',
            'INSERT INTO exercise VALUES(NULL, NULL, 3, 4, 3, 2, 5, 2, 2, 3, 2, 2, 0, 0, 4);',
            'INSERT INTO exerciseLookup VALUES(1, 6, "Reining", "Spezielle und sehr bekannte Übung aus dem Westernreiten.");',
            'INSERT INTO exercise VALUES(NULL, NULL, 5, 4, 3, 2, 3, 4, 3, 2, 5, 2, 0, 0, 5);',
            'INSERT INTO exerciseLookup VALUES(1, 7, "Doppel-T", "Die Stangen werden wie zwei gegenüberliegende Ts hingelegt.");',
            'INSERT INTO exercise VALUES(NULL, NULL, 5, 4, 3, 2, 3, 4, 3, 2, 5, 2, 0, 0, 7);',
            'INSERT INTO exerciseLookup VALUES(1, 8, "Erstes Anfahren", "Diese Übung wird verwendet, um das Pferd auf das Fahren vorzubereiten.");',
        ]
        this.executeBatch(exercisesStmt)


    }

    prepare() {
        const dropStmt = [
            'DROP TABLE IF EXISTS plan_category;',
            'DROP TABLE IF EXISTS plan_exercise;',
            'DROP TABLE IF EXISTS horse_reminder;',
            'DROP TABLE IF EXISTS plan;',
            'DROP TABLE IF EXISTS exercise;',
            'DROP TABLE IF EXISTS repetitionIntervall;',
            'DROP TABLE IF EXISTS reminder;',
            'DROP TABLE IF EXISTS sizeByUnitLookup;', // deprecated
            'DROP TABLE IF EXISTS generalSizeLookup;', // deprecated
            'DROP TABLE IF EXISTS sizeLookup;',
            'DROP TABLE IF EXISTS horse;',
            'DROP TABLE IF EXISTS categoryLookup;',
            'DROP TABLE IF EXISTS reminderLookup;',
            'DROP TABLE IF EXISTS exerciseLookup;',
            'DROP TABLE IF EXISTS category;',
            'DROP TABLE IF EXISTS language;',
            'DROP TABLE IF EXISTS unitLookup;'
        ]

        const createStmt = [
            "CREATE TABLE unitLookup( \
            unit_id INTEGER PRIMARY KEY, \
            short_unit_description VARCHAR(5) \
        );",
            "CREATE TABLE language( \
            language_id INTEGER PRIMARY KEY, \
            short_language_description CHAR(5) \
        );",
            "CREATE TABLE categoryLookup( \
            language_id INTEGER, \
            category_id INTEGER, \
            category_name VARCHAR(50), \
            FOREIGN KEY(language_id) REFERENCES language(language_id), \
            PRIMARY KEY(language_id, category_id) \
        );",
            "CREATE TABLE exerciseLookup( \
            language_id INTEGER, \
            exercise_id INTEGER, \
            exercise_name VARCHAR(150), \
            exercise_description TEXT, \
            FOREIGN KEY(language_id) REFERENCES language(language_id), \
            FOREIGN KEY(exercise_id) REFERENCES exercise(exercise_id), \
            PRIMARY KEY(language_id, exercise_id) \
        );",
            "CREATE TABLE reminderLookup( \
            language_id INTEGER, \
            reminder_id INTEGER, \
            reminder_name VARCHAR(50), \
            FOREIGN KEY(language_id) REFERENCES language(language_id), \
            FOREIGN KEY(reminder_id) REFERENCES exercise(reminder_id), \
            PRIMARY KEY(language_id, reminder_id) \
        );",
            "CREATE TABLE exercise( \
            exercise_id INTEGER PRIMARY KEY AUTOINCREMENT, \
            photo_path_exercise VARCHAR(150), \
            rhythm INTEGER, \
            relaxation INTEGER, \
            connection INTEGER, \
            impulsion INTEGER, \
            straightness INTEGER, \
            collection INTEGER, \
            muscle_gain INTEGER, \
            fascias_training INTEGER, \
            myofascial_coordination INTEGER, \
            complexity INTEGER, \
            is_custom INTEGER, \
            is_favoured INTEGER, \
            category_id INTEGER, \
            FOREIGN KEY(category_id) REFERENCES category(category_id) \
        );",
        "CREATE TABLE repetitionIntervall( \
            repetitionIntervall_id INTEGER PRIMARY KEY AUTOINCREMENT, \
            repeat_unit INTEGER, \
            repeat_value INTEGER, \
            FOREIGN KEY(repeat_unit) REFERENCES unitLookup(unit_id) \
        );",
            "CREATE TABLE reminder( \
            reminder_id INTEGER PRIMARY KEY AUTOINCREMENT, \
            icon_path VARCHAR(150), \
            recommendedRepetitionIntervall INTEGER, \
            FOREIGN KEY (recommendedRepetitionIntervall) REFERENCES repetitionIntervall(repetitionIntervall_id) \
        );",
            "CREATE TABLE sizeLookup( \
            sizeLookup_id INTEGER PRIMARY KEY AUTOINCREMENT, \
            size_value VARCHAR(20) \
        );",
            "CREATE TABLE horse( \
            horse_id INTEGER PRIMARY KEY AUTOINCREMENT, \
            fullname VARCHAR(50), \
            nick VARCHAR(50), \
            photoPath VARCHAR(150), \
            birthdate CHAR(10), \
            gender CHAR(1), \
            equestrian_number VARCHAR(20), \
            heightInCentimeter DOUBLE, \
            weightInKilo DOUBLE, \
            blanketSizeInCentimeter INTEGER,  \
            gaiter_size INTEGER, \
            hoof_boots_size INTEGER, \
            bridle_size INTEGER, \
            commentary TEXT, \
            FOREIGN KEY (gaiter_size) REFERENCES sizeLookup(sizeLookup_id), \
            FOREIGN KEY (hoof_boots_size) REFERENCES sizeLookup(sizeLookup_id), \
            FOREIGN KEY (bridle_size) REFERENCES sizeLookup(sizeLookup_id) \
        );",
        "CREATE TABLE horse_reminder( \
            horse_id INTEGER, \
            reminder_id INTEGER, \
            repetitionIntervall, \
            PRIMARY KEY(horse_id, reminder_id), \
            FOREIGN KEY(horse_id) REFERENCES horse(horse_id), \
            FOREIGN KEY(reminder_id) REFERENCES reminder(reminder_id) \
            FOREIGN KEY(repetitionIntervall) REFERENCES repetitionIntervall(repetitionIntervall_id) \
        );",
        "CREATE TABLE plan( \
            plan_id INTEGER PRIMARY KEY AUTOINCREMENT, \
            date CHAR(10), \
            duration INTEGER, \
            goal VARCHAR(200), \
            riderMood INTEGER, \
            horseMood INTEGER, \
            plan_commentary TEXT, \
            horse_id INTEGER, \
            FOREIGN KEY (horse_id) REFERENCES horse(horse_id) \
        );",
            "CREATE TABLE plan_category( \
            plan_id INTEGER, \
            category_id INTEGER,  \
            PRIMARY KEY(plan_id, category_id), \
            FOREIGN KEY(plan_id) REFERENCES plan(plan_id), \
            FOREIGN KEY(category_id) REFERENCES category(category_id) \
        );",
            "CREATE TABLE plan_exercise( \
            plan_id INTEGER, \
            exercise_id INTEGER, \
            done INTEGER, \
            succeeded INTEGER, \
            improved CHAR(1), \
            repeat CHAR(1), \
            exercise_commentary TEXT, \
            PRIMARY KEY(plan_id, exercise_id), \
            FOREIGN KEY(plan_id) REFERENCES plan(plan_id), \
            FOREIGN KEY(exercise_id) REFERENCES exercise(exercise_id) \
        );"
        ]

        const insertStmt = [
            'INSERT INTO language VALUES(1, "de_DE");',
            'INSERT INTO categoryLookup VALUES(1,1, "Bodenarbeit");',
            'INSERT INTO categoryLookup VALUES(1,2, "Longieren");',
            'INSERT INTO categoryLookup VALUES(1,3, "Dressur");',
            'INSERT INTO categoryLookup VALUES(1,4, "Western");',
            'INSERT INTO categoryLookup VALUES(1,5, "Springen, Stangen und Pylonen");',
            'INSERT INTO categoryLookup VALUES(1,6, "Gymnastizierung und sonstige Reiterei");',
            'INSERT INTO categoryLookup VALUES(1,7, "Langzügel und Doppellonge");',
            'INSERT INTO categoryLookup VALUES(1,8, "Ausreiten und Spazierengehen");',
            'SELECT * FROM categoryLookup;',
            "SELECT name FROM sqlite_master WHERE type='table';",
        ]
        const prepareStmt = dropStmt.concat(createStmt).concat(insertStmt);


        this.executeBatch(prepareStmt)

    }
}
