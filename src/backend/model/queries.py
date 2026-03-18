from model.database import get_db_connection

def get_user_answers(attempt_id): # Define a function to retrieve user answers based on the attempt ID
    connection = get_db_connection() # Get a connection to the database
    cursor_connection = connection.cursor() # Create a cursor object to execute SQL queries
    
    cursor_connection.execute
    (
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

    cursor_connection.execute
    (
        """
        SELECT 
            c.course_id, 
            c.university_id,
            c.course_name, 
            c.discipline,
            c.teaching_method_summary,
            c.assessment_method_summary,
            c.career_outcomes_summary,
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

    cursor_connection.execute
    (
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
        cursor_connection.execute
        (
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
        cursor_connection.execute
        (
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