SELECT 
collections.user_id,
collections.collection_name,
videos.id as videos_table_video_id,
videos.video_id as youtube_video_id,
videos.collection_id,
videos.description
FROM collections 
INNER JOIN videos on collections.id = videos.collection_id
WHERE collections.user_id=9;