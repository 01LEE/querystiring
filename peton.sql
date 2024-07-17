CREATE TABLE `relation` (
	`pet_id`	int	NOT NULL,
	`user_id`	int	NOT NULL
);

CREATE TABLE `noticeboard` (
	`post_id`	int	NOT NULL,
	`user_id`	int	NOT NULL,
	`nick_name`	varchar(32)	NULL,
	`title`	varchar(100)	NULL,
	`description`	text	NULL,
	`write_time`	DateTime	NULL,
	`update_time`	DateTime	NULL
);

CREATE TABLE `comment` (
	`id`	int	NOT NULL,
	`user_id`	int	NOT NULL,
	`post_id`	int	NOT NULL,
	`c_description`	text	NULL,
	`write_time`	DateTime	NULL,
	`update_time`	DateTime	NULL
);

CREATE TABLE `pet` (
	`pet_id`	int	NOT NULL,
	`pet_name`	varchar(32)	NULL,
	`pet_type`	varchar(32)	NULL,
	`pet_gender`	varchar(4)	NULL,
	`pet_birth`	DateTime	NULL,
	`pet_weight`	int	NULL
);

CREATE TABLE `user` (
	`user_id`	int	NOT NULL,
	`login_id`	varchar(32)	NULL,
	`nick_name`	varchar(32)	NULL,
	`password`	varchar(32)	NULL,
	`create_time`	DateTime	NULL,
	`update_time`	DateTime	NULL,
	`user_intro`	text	NULL,
	`pw_update_time`	DateTime	NULL,
	`pw_find`	varchar(4)	NULL
);

CREATE TABLE `recomment` (
	`recomment_id`	int	NOT NULL,
	`user_id`	int	NOT NULL,
	`comment_id`	int	NOT NULL,
	`rc_description`	text	NULL,
	`write_time`	DateTime	NULL,
	`update_time`	DateTime	NULL
);

CREATE TABLE `like` (
	`like_id`	int	NOT NULL,
	`user_id`	int	NOT NULL,
	`post_id`	int	NOT NULL
);

CREATE TABLE `pw_history` (
	`historyid`	int	NOT NULL,
	`user_id`	int	NOT NULL,
	`password`	varcher(32)	NULL
);

CREATE TABLE `notice` (
	`noticeid`	int	NOT NULL,
	`Field`	VARCHAR(255)	NULL
);

ALTER TABLE `noticeboard` ADD CONSTRAINT `PK_NOTICEBOARD` PRIMARY KEY (
	`post_id`
);

ALTER TABLE `comment` ADD CONSTRAINT `PK_COMMENT` PRIMARY KEY (
	`id`
);

ALTER TABLE `pet` ADD CONSTRAINT `PK_PET` PRIMARY KEY (
	`pet_id`
);

ALTER TABLE `user` ADD CONSTRAINT `PK_USER` PRIMARY KEY (
	`user_id`
);

ALTER TABLE `recomment` ADD CONSTRAINT `PK_RECOMMENT` PRIMARY KEY (
	`recomment_id`
);

ALTER TABLE `like` ADD CONSTRAINT `PK_LIKE` PRIMARY KEY (
	`like_id`
);

ALTER TABLE `pw_history` ADD CONSTRAINT `PK_PW_HISTORY` PRIMARY KEY (
	`historyid`
);

ALTER TABLE `notice` ADD CONSTRAINT `PK_NOTICE` PRIMARY KEY (
	`noticeid`
);

