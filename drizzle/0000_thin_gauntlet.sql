CREATE TABLE `interests` (
	`id` text PRIMARY KEY NOT NULL,
	`reference` text NOT NULL,
	`delete_hash` text NOT NULL,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`phone` text DEFAULT '' NOT NULL,
	`postcode_area` text DEFAULT '' NOT NULL,
	`district` text DEFAULT '' NOT NULL,
	`age_stage` text NOT NULL,
	`preferred_days` text NOT NULL,
	`start_month` text DEFAULT '' NOT NULL,
	`consent_version` text NOT NULL,
	`created_at` integer NOT NULL,
	`expires_at` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `interests_reference_unique` ON `interests` (`reference`);--> statement-breakpoint
CREATE INDEX `interests_email_created_idx` ON `interests` (`email`,`created_at`);--> statement-breakpoint
CREATE INDEX `interests_expiry_idx` ON `interests` (`expires_at`);