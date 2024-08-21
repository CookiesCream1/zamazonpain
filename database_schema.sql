CREATE TABLE `products` (
	`product_id` INT NOT NULL AUTO_INCREMENT,
	`product_name` VARCHAR(255) NOT NULL COLLATE 'latin1_swedish_ci',
	`description` TEXT NULL DEFAULT NULL COLLATE 'latin1_swedish_ci',
	`price` DECIMAL(10,2) NOT NULL,
	`category_id` INT NOT NULL,
	`rating` FLOAT NULL DEFAULT '2.5',
	`removed` TINYINT UNSIGNED NOT NULL DEFAULT '0',
	PRIMARY KEY (`product_id`) USING BTREE,
	UNIQUE INDEX `product_name` (`product_name`) USING BTREE,
	INDEX `category_id` (`category_id`) USING BTREE,
	CONSTRAINT `products_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `product_categories` (`category_id`) ON UPDATE NO ACTION ON DELETE NO ACTION
)
COLLATE='latin1_swedish_ci'
ENGINE=InnoDB
AUTO_INCREMENT=61
;

CREATE TABLE `product_categories` (
	`category_id` INT NOT NULL AUTO_INCREMENT,
	`category_name` VARCHAR(255) NOT NULL COLLATE 'latin1_swedish_ci',
	PRIMARY KEY (`category_id`) USING BTREE,
	UNIQUE INDEX `category_name` (`category_name`) USING BTREE
)
COLLATE='latin1_swedish_ci'
ENGINE=InnoDB
AUTO_INCREMENT=7
;

CREATE TABLE `sales` (
	`sale_id` INT NOT NULL AUTO_INCREMENT,
	`user_id` VARCHAR(255) NOT NULL COLLATE 'latin1_swedish_ci',
	`sale_date` TIMESTAMP NULL DEFAULT (CURRENT_TIMESTAMP),
	`total_amount` DECIMAL(10,2) NULL DEFAULT NULL,
	`sale_status` INT NOT NULL,
	PRIMARY KEY (`sale_id`) USING BTREE,
	INDEX `user_id` (`user_id`) USING BTREE,
	INDEX `sale_satus` (`sale_status`) USING BTREE,
	CONSTRAINT `sales_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON UPDATE NO ACTION ON DELETE NO ACTION,
	CONSTRAINT `sales_ibfk_2` FOREIGN KEY (`sale_status`) REFERENCES `sale_status` (`id`) ON UPDATE NO ACTION ON DELETE NO ACTION
)
COLLATE='latin1_swedish_ci'
ENGINE=InnoDB
AUTO_INCREMENT=10
;

CREATE TABLE `sale_details` (
	`sale_detail_id` INT NOT NULL AUTO_INCREMENT,
	`sale_id` INT NOT NULL,
	`product_id` INT NOT NULL,
	`quantity` INT NOT NULL,
	`price` DECIMAL(10,2) NULL DEFAULT NULL,
	PRIMARY KEY (`sale_detail_id`) USING BTREE,
	INDEX `sale_id` (`sale_id`) USING BTREE,
	INDEX `product_id` (`product_id`) USING BTREE,
	CONSTRAINT `sale_details_ibfk_1` FOREIGN KEY (`sale_id`) REFERENCES `sales` (`sale_id`) ON UPDATE NO ACTION ON DELETE NO ACTION,
	CONSTRAINT `sale_details_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`) ON UPDATE NO ACTION ON DELETE NO ACTION
)
COLLATE='latin1_swedish_ci'
ENGINE=InnoDB
AUTO_INCREMENT=15
;

CREATE TABLE `sale_status` (
	`status` VARCHAR(50) NOT NULL COLLATE 'utf8mb4_0900_ai_ci',
	`id` INT NOT NULL AUTO_INCREMENT,
	PRIMARY KEY (`id`) USING BTREE,
	UNIQUE INDEX `status` (`status`) USING BTREE
)
COLLATE='utf8mb4_0900_ai_ci'
ENGINE=InnoDB
AUTO_INCREMENT=4
;

CREATE TABLE `users` (
	`user_id` VARCHAR(255) NOT NULL COLLATE 'latin1_swedish_ci',
	`user_role` INT NOT NULL DEFAULT '5',
	`created_at` TIMESTAMP NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	PRIMARY KEY (`user_id`) USING BTREE,
	INDEX `FK_UserRole` (`user_role`) USING BTREE,
	CONSTRAINT `FK_UserRole` FOREIGN KEY (`user_role`) REFERENCES `user_roles` (`role_id`) ON UPDATE NO ACTION ON DELETE NO ACTION
)
COLLATE='latin1_swedish_ci'
ENGINE=InnoDB
;

CREATE TABLE `user_roles` (
	`role_id` INT NOT NULL AUTO_INCREMENT,
	`role_name` VARCHAR(255) NOT NULL DEFAULT NULL COLLATE 'latin1_swedish_ci',
	UNIQUE INDEX `role_id` (`role_id`) USING BTREE,
	UNIQUE INDEX `role_name` (`role_name`) USING BTREE
)
COLLATE='latin1_swedish_ci'
ENGINE=InnoDB
AUTO_INCREMENT=6
;
