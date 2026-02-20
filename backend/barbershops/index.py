"""API для управления барбершопами — получение списка и CRUD-операции."""

import json
import os
import psycopg2
import psycopg2.extras


def get_connection():
    return psycopg2.connect(os.environ["DATABASE_URL"])


def handler(event, context):
    if event.get("httpMethod") == "OPTIONS":
        return {
            "statusCode": 200,
            "headers": {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
                "Access-Control-Allow-Headers": "Content-Type, X-User-Id, X-Auth-Token, X-Session-Id",
                "Access-Control-Max-Age": "86400",
            },
            "body": "",
        }

    method = event.get("httpMethod", "GET")
    headers = {"Access-Control-Allow-Origin": "*", "Content-Type": "application/json"}

    if method == "GET":
        return get_barbershops(event, headers)
    elif method == "POST":
        return create_barbershop(event, headers)
    elif method == "PUT":
        return update_barbershop(event, headers)
    elif method == "DELETE":
        return delete_barbershop(event, headers)

    return {"statusCode": 405, "headers": headers, "body": json.dumps({"error": "Method not allowed"})}


def get_barbershops(event, headers):
    params = event.get("queryStringParameters") or {}
    city = params.get("city")

    conn = get_connection()
    cur = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)

    if city and city != "Все города":
        cur.execute("SELECT * FROM barbershops WHERE is_active = true AND city = %s ORDER BY rating DESC", (city,))
    else:
        cur.execute("SELECT * FROM barbershops WHERE is_active = true ORDER BY rating DESC")

    rows = cur.fetchall()
    cur.close()
    conn.close()

    for row in rows:
        row["created_at"] = row["created_at"].isoformat() if row["created_at"] else None
        row["rating"] = float(row["rating"]) if row["rating"] else 0

    return {"statusCode": 200, "headers": headers, "body": json.dumps(rows, ensure_ascii=False)}


def create_barbershop(event, headers):
    body = json.loads(event.get("body", "{}"))

    conn = get_connection()
    cur = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
    cur.execute(
        """INSERT INTO barbershops (name, city, address, rating, reviews_count, services, masters_count, image_url)
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s) RETURNING *""",
        (
            body["name"],
            body["city"],
            body["address"],
            body.get("rating", 0),
            body.get("reviews_count", 0),
            body.get("services", []),
            body.get("masters_count", 0),
            body.get("image_url", ""),
        ),
    )
    row = cur.fetchone()
    conn.commit()
    cur.close()
    conn.close()

    row["created_at"] = row["created_at"].isoformat() if row["created_at"] else None
    row["rating"] = float(row["rating"]) if row["rating"] else 0

    return {"statusCode": 201, "headers": headers, "body": json.dumps(row, ensure_ascii=False)}


def update_barbershop(event, headers):
    body = json.loads(event.get("body", "{}"))
    shop_id = body.get("id")

    if not shop_id:
        return {"statusCode": 400, "headers": headers, "body": json.dumps({"error": "id is required"})}

    conn = get_connection()
    cur = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
    cur.execute(
        """UPDATE barbershops SET name=%s, city=%s, address=%s, rating=%s, reviews_count=%s, 
        services=%s, masters_count=%s, image_url=%s WHERE id=%s RETURNING *""",
        (
            body["name"],
            body["city"],
            body["address"],
            body.get("rating", 0),
            body.get("reviews_count", 0),
            body.get("services", []),
            body.get("masters_count", 0),
            body.get("image_url", ""),
            shop_id,
        ),
    )
    row = cur.fetchone()
    conn.commit()
    cur.close()
    conn.close()

    if not row:
        return {"statusCode": 404, "headers": headers, "body": json.dumps({"error": "Not found"})}

    row["created_at"] = row["created_at"].isoformat() if row["created_at"] else None
    row["rating"] = float(row["rating"]) if row["rating"] else 0

    return {"statusCode": 200, "headers": headers, "body": json.dumps(row, ensure_ascii=False)}


def delete_barbershop(event, headers):
    params = event.get("queryStringParameters") or {}
    shop_id = params.get("id")

    if not shop_id:
        return {"statusCode": 400, "headers": headers, "body": json.dumps({"error": "id is required"})}

    conn = get_connection()
    cur = conn.cursor()
    cur.execute("UPDATE barbershops SET is_active = false WHERE id = %s", (shop_id,))
    conn.commit()
    cur.close()
    conn.close()

    return {"statusCode": 200, "headers": headers, "body": json.dumps({"success": True})}
