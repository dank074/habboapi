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