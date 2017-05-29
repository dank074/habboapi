DROP TABLE IF EXISTS `api_loginlog`;

CREATE TABLE `api_loginlog` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `user_name` varchar(100) NOT NULL,
  `user_ip` varchar(100) NOT NULL,
  `user_agent` text NOT NULL,
  `login_status` enum('0','1') NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

DROP TABLE IF EXISTS `api_logs`;

CREATE TABLE `api_logs` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `action` varchar(100) NOT NULL DEFAULT '',
  `parameters` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

DROP TABLE IF EXISTS `api_permissions`;

CREATE TABLE `api_permissions` (
  `rank_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `rank_name` varchar(100) DEFAULT NULL,
  `hk.login` enum('0','1') NOT NULL DEFAULT '0',
  `hk.dashboard` enum('0','1') NOT NULL DEFAULT '0',
  `hk.announcements.view` enum('0','1') NOT NULL DEFAULT '0',
  `hk.announcements.add` enum('0','1') NOT NULL DEFAULT '0',
  `hk.user.user_list` enum('0','1') NOT NULL DEFAULT '0',
  PRIMARY KEY (`rank_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `api_permissions` (`rank_id`, `rank_name`, `hk.login`, `hk.dashboard`, `hk.announcements.view`, `hk.announcements.add`, `hk.user.user_list`)
VALUES
	(1,'User','0','0','0','0','0'),
	(2,'Habbo Club','0','0','0','0','0'),
	(3,NULL,'0','0','0','0','0'),
	(4,NULL,'0','0','0','0','0'),
	(5,'Moderator','0','0','0','0','0'),
	(6,'Community Manager','0','0','0','0','0'),
	(7,'Administrator','0','0','0','0','0');

DROP TABLE IF EXISTS `api_sessions`;

CREATE TABLE `api_sessions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `user_name` varchar(100) NOT NULL,
  `user_session` varchar(100) NOT NULL DEFAULT '',
  `user_ip` varchar(100) NOT NULL DEFAULT '',
  `user_agent` text NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;