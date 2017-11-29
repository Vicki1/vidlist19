CREATE TABLE IF NOT EXISTS videos(
 id SERIAL PRIMARY KEY,
 user_id int,
 video_id varchar(50),
 collection_id int,
 description_user varchar(1000),
 channel_title varchar(100),
 video_title varchar(100),
 description_youtube varchar(10000),
 thumbnail_url varchar(10000),
FOREIGN KEY (collection_id) REFERENCES collections(id),
FOREIGN KEY (user_id) REFERENCES users(id)
)