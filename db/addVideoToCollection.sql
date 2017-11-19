INSERT INTO videos (video_id,collection_id,description,user_id)
VALUES ($1,$2,$3,$4)
RETURNING video_id,collection_id,description;