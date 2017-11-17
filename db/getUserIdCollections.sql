SELECT
users.id,
users.display_name,
collections.id as collection_id,
collections.collection_name
FROM users
INNER JOIN collections on collections.user_id = users.id
WHERE users.display_name=$1;