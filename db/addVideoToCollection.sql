INSERT INTO videos (user_id, video_id, collection_id, description_user, channel_title, video_title, description_youtube, thumbnail_url)
VALUES ($3,$1,$2,$4,$5,$6,$7,$8)
RETURNING user_id, video_id, collection_id, description_user, channel_title, video_title, description_youtube, thumbnail_url;



