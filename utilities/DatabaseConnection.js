
import { openDatabase } from 'expo-sqlite';

export default class DatabaseConnection {

    //TODO Singleton with prepare

    constructor() {
        this.db = openDatabase("equiday_db");
    }
    
    executeStmt(sql, onSuccess, onError){
        this.db.transaction(
            tx => {
                tx.executeSql(
                    sql, 
                    [],
                    (tx, results) => {
                        onSuccess(results)
                    },
                    (tx, error) => {
                        console.log("Could not execute query: " + error);
                        onError(error)
                    }
                )
            },
            error => {
                console.log("Transaction error: " + error);
            },
            () => {
                console.log("Transaction done");
            }
        )
    }


    insertPlaceholderData(){
        // TODO für den Anfang, z.B. Pferd
    }

    createExercises(){
        // TODO
    }

    prepare(){
        const dropStmt = `
        DROP TABLE IF EXISTS plan_category;
        DROP TABLE IF EXISTS plan_exercise;
        DROP TABLE IF EXISTS horse_reminder;
        DROP TABLE IF EXISTS plan;
        DROP TABLE IF EXISTS exercise;
        DROP TABLE IF EXISTS repetitionIntervall;
        DROP TABLE IF EXISTS reminder;
        DROP TABLE IF EXISTS sizeByUnitLookup;
        DROP TABLE IF EXISTS generalSizeLookup;
        DROP TABLE IF EXISTS horse;
        DROP TABLE IF EXISTS categoryLookup;
        DROP TABLE IF EXISTS reminderLookup;
        DROP TABLE IF EXISTS exerciseLookup;
        DROP TABLE IF EXISTS category;
        DROP TABLE IF EXISTS language;
        DROP TABLE IF EXISTS unitLookup;
        `;

        const createStmt = `
        CREATE TABLE unitLookup(
            unit_id INTEGER PRIMARY KEY,
            short_description VARCHAR(5)
        );
        CREATE TABLE language(
            language_id INTEGER PRIMARY KEY,
            short_description CHAR(5)
        );
        CREATE TABLE categoryLookup(
            language_id INTEGER,
            category_id INTEGER,
            description VARCHAR(50),
            FOREIGN KEY(language_id) REFERENCES language(language_id),
            PRIMARY KEY(language_id, category_id)
        );
        CREATE TABLE exerciseLookup(
            language_id INTEGER,
            exercise_id INTEGER,
            name VARCHAR(150),
            description TEXT,
            FOREIGN KEY(language_id) REFERENCES language(language_id),
            FOREIGN KEY(exercise_id) REFERENCES exercise(exercise_id),
            PRIMARY KEY(language_id, exercise_id)
        );
        CREATE TABLE reminderLookup(
            language_id INTEGER,
            reminder_id INTEGER,
            name VARCHAR(50),
            FOREIGN KEY(language_id) REFERENCES language(language_id),
            FOREIGN KEY(reminder_id) REFERENCES exercise(reminder_id),
            PRIMARY KEY(language_id, reminder_id)
        );
        CREATE TABLE exercise(
            exercise_id INTEGER PRIMARY KEY AUTOINCREMENT,
            photoPath VARCHAR(150),
            rhythm INTEGER,
            relaxation INTEGER,
            connection INTEGER,
            impulsion INTEGER,
            straightness INTEGER,
            collection INTEGER,
            muscle_gain INTEGER,
            fascias_training INTEGER,
            myofascial_coordination INTEGER,
            complexity INTEGER,
            is_custom INTEGER,
            is_favoured INTEGER,
            category_id INTEGER,
            FOREIGN KEY(category_id) REFERENCES category(category_id)
        );
        CREATE TABLE repetitionIntervall(
            repetitionIntervall_id INTEGER PRIMARY KEY AUTOINCREMENT,
            unit INTEGER,
            value INTEGER,
            FOREIGN KEY(unit) REFERENCES unitLookup(unit_id)
        );
        CREATE TABLE reminder(
            reminder_id INTEGER PRIMARY KEY AUTOINCREMENT,
            iconPath VARCHAR(150),
            recommendedRepetitionIntervall INTEGER,
            FOREIGN KEY (recommendedRepetitionIntervall) REFERENCES repetitionIntervall(repetitionIntervall_id)
        );
        CREATE TABLE sizeByUnitLookup(
            sizeByUnitLookup_id INTEGER PRIMARY KEY AUTOINCREMENT,
            size INTEGER,
            unit INTEGER,
            FOREIGN KEY(unit) REFERENCES unitLookup(unit_id)
        );
        CREATE TABLE generalSizeLookup(
            generalSizeLookup_id INTEGER PRIMARY KEY AUTOINCREMENT,
            size VARCHAR(20)
        );
        CREATE TABLE horse(
            horse_id INTEGER PRIMARY KEY AUTOINCREMENT,
            fullname VARCHAR(50),
            nick VARCHAR(50),
            photoPath VARCHAR(150),
            birthdate CHAR(10),
            gender INTEGER,
            equestrian_number VARCHAR(20),
            heightInCentimeter DOUBLE,
            weightInKilo DOUBLE,
            blanket_size INTEGER, 
            gaiter_size INTEGER,
            hoof_boots_size INTEGER,
            bridle_size INTEGER,
            commentary TEXT,
            FOREIGN KEY (blanket_size) REFERENCES sizeByUnitLookup(sizeByUnitLookup_id),
            FOREIGN KEY (gaiter_size) REFERENCES generalSizeLookup(generalSizeLookup_id),
            FOREIGN KEY (hoof_boots_size) REFERENCES generalSizeLookup(generalSizeLookup_id),
            FOREIGN KEY (bridle_size) REFERENCES generalSizeLookup(generalSizeLookup_id)
        );
        CREATE TABLE horse_reminder(
            horse_id INTEGER,
            reminder_id INTEGER,
            repetitionIntervall,
            PRIMARY KEY(horse_id, reminder_id),
            FOREIGN KEY(horse_id) REFERENCES horse(horse_id),
            FOREIGN KEY(reminder_id) REFERENCES reminder(reminder_id)
            FOREIGN KEY(repetitionIntervall) REFERENCES repetitionIntervall(repetitionIntervall_id)
        );
        CREATE TABLE plan(
            plan_id INTEGER PRIMARY KEY AUTOINCREMENT,
            date CHAR(10),
            duration INTEGER,
            goal VARCHAR(200),
            riderMood INTEGER,
            horseMood INTEGER,
            commentary TEXT,
            horse_id INTEGER,
            FOREIGN KEY (horse_id) REFERENCES horse(horse_id)
        );
        CREATE TABLE plan_category(
            plan_id INTEGER,
            category_id INTEGER, 
            PRIMARY KEY(plan_id, category_id),
            FOREIGN KEY(plan_id) REFERENCES plan(plan_id),
            FOREIGN KEY(category_id) REFERENCES category(category_id)
        );
        CREATE TABLE plan_exercise(
            plan_id INTEGER,
            exercise_id INTEGER, 
            done INTEGER,
            succeeded INTEGER,
            improved CHAR(1),
            repeat CHAR(1),
            PRIMARY KEY(plan_id, exercise_id),
            FOREIGN KEY(plan_id) REFERENCES plan(plan_id),
            FOREIGN KEY(exercise_id) REFERENCES exercise(exercise_id)
        );
        `

        const insertStmt = `
            INSERT INTO language VALUES(1, "de_DE");
            INSERT INTO categoryLookup VALUES(1,1, "Bodenarbeit");
            INSERT INTO categoryLookup VALUES(1,2, "Longieren");
            INSERT INTO categoryLookup VALUES(1,3, "Dressur");
            INSERT INTO categoryLookup VALUES(1,4, "Western");
            INSERT INTO categoryLookup VALUES(1,5, "Springen, Stangen und Pylonen");
            INSERT INTO categoryLookup VALUES(1,6, "Gymnastizierung und sonstige Reiterei");
            INSERT INTO categoryLookup VALUES(1,7, "Langzügel und Doppellonge");
            INSERT INTO categoryLookup VALUES(1,8, "Ausreiten und Spazierengehen");
        `
        const prepareStmt = dropStmt + createStmt + insertStmt;
        this.executeStmt(prepareStmt, (results) => {console.log(results)}, (error) => console.log("Fehler: " + error)) // TODO Debug only
        
        this.createExercises();
    }
}
