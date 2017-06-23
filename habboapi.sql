DROP TABLE IF EXISTS `api_loginlog`;

-- Create syntax for TABLE 'api_loginlog'
CREATE TABLE `api_loginlog` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `user_name` varchar(100) NOT NULL,
  `user_ip` varchar(100) NOT NULL,
  `user_agent` text NOT NULL,
  `login_status` enum('0','1') NOT NULL,
  `login_type` enum('site','hk') DEFAULT 'site',
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

DROP TABLE IF EXISTS `api_logs`;

-- Create syntax for TABLE 'api_logs'
CREATE TABLE `api_logs` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `action` varchar(100) NOT NULL DEFAULT '',
  `parameters` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

DROP TABLE IF EXISTS `api_news`;

-- Create syntax for TABLE 'api_news'
CREATE TABLE `api_news` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `title` text,
  `description` text,
  `content` text,
  `room_id` int(11) DEFAULT NULL,
  `group_id` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

DROP TABLE IF EXISTS `api_permissions`;

-- Create syntax for TABLE 'api_permissions'
CREATE TABLE `api_permissions` (
  `rank_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `rank_name` varchar(100) NOT NULL DEFAULT '',
  `hk_login` enum('0','1') NOT NULL DEFAULT '0',
  `hk_dashboard` enum('0','1') NOT NULL DEFAULT '0',
  PRIMARY KEY (`rank_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

DROP TABLE IF EXISTS `api_sessions`;

-- Create syntax for TABLE 'api_sessions'
CREATE TABLE `api_sessions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `user_name` varchar(100) NOT NULL,
  `user_session` varchar(100) NOT NULL DEFAULT '',
  `user_ip` varchar(100) NOT NULL DEFAULT '',
  `user_agent` text NOT NULL,
  `session_type` enum('site','hk') NOT NULL DEFAULT 'site',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

DROP TABLE IF EXISTS `api_users`;

-- Create syntax for TABLE 'api_users'
CREATE TABLE `api_users` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `hotel_id` int(11) NOT NULL,
  `user_name` varchar(100) NOT NULL DEFAULT '',
  `user_pass` text NOT NULL,
  `user_email` text NOT NULL,
  `user_rank` int(11) NOT NULL,
  `user_disabled` enum('0','1') NOT NULL DEFAULT '0',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `hotel_id` (`hotel_id`),
  UNIQUE KEY `user_name` (`user_name`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;