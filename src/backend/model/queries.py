from model.database import get_db_connection

def signup_user(first_name, email, password_hash):
    connection = get_db_connection()
    cursor_connection = connection.cursor()
    cursor_connection.execute(
        """
        INSERT INTO users (first_name, email, password_hash, created_at, updated_at)
        VALUES (%s, %s, %s, NOW(), NOW())
        RETURNING user_id, first_name, email
        """,
        (first_name, email, password_hash)
    )
    row = cursor_connection.fetchone()
    connection.commit()
    cursor_connection.close()
    connection.close()
    return {"user_id": row[0], "first_name": row[1], "email": row[2]}

def get_user_saves(user_id):
    connection = get_db_connection()
    cursor_connection = connection.cursor()
    cursor_connection.execute(
        """
        SELECT
            qa.attempt_id,
            -- Collect unique course names saved in this attempt, ignoring nulls (attempt has no courses)
            array_agg(DISTINCT c.course_name) FILTER (WHERE c.course_name IS NOT NULL) AS courses,
            -- Collect unique university names saved in this attempt, ignoring nulls
            array_agg(DISTINCT u.university_name) FILTER (WHERE u.university_name IS NOT NULL) AS universities
        FROM quiz_attempts qa
        -- LEFT JOINs so attempts with no saved results still appear
        LEFT JOIN course_results cr ON cr.attempt_id = qa.attempt_id
        LEFT JOIN courses c ON c.course_id = cr.course_id
        LEFT JOIN university_results ur ON ur.attempt_id = qa.attempt_id
        LEFT JOIN universities u ON u.university_id = ur.university_id
        WHERE qa.user_id = %s
        GROUP BY qa.attempt_id
        ORDER BY qa.attempt_id
        """,
        (user_id,)
    )
    rows = cursor_connection.fetchall()
    cursor_connection.close()
    connection.close()
    return [
        {
            "attemptId": row[0],
            "courses": row[1] or [],
            "universities": row[2] or [],
        }
        for row in rows
    ]

def get_user_by_email(email):
    connection = get_db_connection()
    cursor_connection = connection.cursor()
    cursor_connection.execute(
        "SELECT user_id, first_name, email, password_hash FROM users WHERE email = %s",
        (email,)
    )
    row = cursor_connection.fetchone()
    cursor_connection.close()
    connection.close()
    if row is None:
        return None
    return {"user_id": row[0], "first_name": row[1], "email": row[2], "password_hash": row[3]}

def create_attempt(user_id=None):
    connection = get_db_connection()
    cursor_connection = connection.cursor()
    cursor_connection.execute(
        "INSERT INTO quiz_attempts (user_id, started_at) VALUES (%s, NOW()) RETURNING attempt_id",
        (user_id,)
    )
    attempt_id = cursor_connection.fetchone()[0]
    connection.commit()
    cursor_connection.close()
    connection.close()
    return attempt_id

def get_user_answers(attempt_id): # Define a function to retrieve user answers based on the attempt ID
    connection = get_db_connection() # Get a connection to the database
    cursor_connection = connection.cursor() # Create a cursor object to execute SQL queries
    
    cursor_connection.execute(
        """SELECT q.question_text, ao.option_text
        FROM user_answers ua
        JOIN questions q ON ua.question_id = q.question_id
        JOIN answer_options ao ON ua.option_id = ao.option_id
        WHERE ua.attempt_id = %s
        """, (attempt_id,)
    ) # Execute a SQL query to select all records from the user_answers table

    rows = cursor_connection.fetchall() # Fetch all the results of the query

    results = [ # Initialize an empty list to store the results
        {
            "question": row[0], "selected_option": row[1]
        } 
        for row in rows
    ] 
    cursor_connection.close() # Close the cursor connection
    connection.close() # Close the database connection
    return results # Return the list of results

def get_courses():
    connection = get_db_connection()
    cursor_connection = connection.cursor()

    cursor_connection.execute(
        """
        SELECT 
            c.course_id, 
            c.university_id,
            c.course_name, 
            c.discipline,
            c.teaching_method_summary,
            c.assessment_method_summary,
            c.career_outcome_summary,
            u.university_name
        FROM courses c
        JOIN universities u ON c.university_id = u.university_id
        """
    ) # Execute a SQL query to select all records from the courses table

    rows = cursor_connection.fetchall()

    results = []

    for row in rows:
        results.append(
            {
                "course_id": row[0],
                "university_id": row[1],
                "course_name": row[2],
                "discipline": row[3],
                "teaching_method_summary": row[4],
                "assessment_method_summary": row[5],
                "career_outcomes_summary": row[6],
                "university_name": row[7]
            }
        )
    cursor_connection.close()
    connection.close()
    return results

def get_universities():
    connection = get_db_connection()
    cursor_connection = connection.cursor()

    cursor_connection.execute(
        """
        SELECT 
            university_id, 
            university_name, 
            support_summary
        FROM universities
        """
    ) # Execute a SQL query to select all records from the universities table

    rows = cursor_connection.fetchall()

    results = []

    for row in rows:
        results.append(
            {
                "university_id": row[0],
                "university_name": row[1],
                "support_summary": row[2],
            }
        )
    cursor_connection.close()
    connection.close()
    return results

def save_course_recommendation(attempt_id, recommended_courses):
    connection = get_db_connection()
    cursor_connection = connection.cursor()

    for course in recommended_courses:
        cursor_connection.execute(
            """
            INSERT INTO course_results (attempt_id, course_id, rank_position, suitability_score, explanation)
            VALUES (%s, %s, %s, %s, %s)
            """, (
                attempt_id, 
                    course["course_id"],
                    course["rank_position"],
                    course["suitability_score"],
                    course["explanation"]
                ))

    connection.commit()
    cursor_connection.close()
    connection.close()

def save_university_recommendation(attempt_id, recommended_universities):
    connection = get_db_connection()
    cursor_connection = connection.cursor()

    for university in recommended_universities:
        cursor_connection.execute(
            """
            INSERT INTO university_results (attempt_id, university_id, rank_position, suitability_score, explanation)
            VALUES (%s, %s, %s, %s, %s)
            """, (
                attempt_id, 
                    university["university_id"],
                    university["rank_position"],
                    university["suitability_score"],
                    university["explanation"]
                ))

    connection.commit()
    cursor_connection.close()
    connection.close()