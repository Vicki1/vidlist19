INSERT INTO users (profile_id,display_name)
VALUES ($1,$2)
RETURNING id;