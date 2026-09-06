CREATE TABLE `rate_limits` (
	`key` text PRIMARY KEY NOT NULL,
	`window` integer NOT NULL,
	`count` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `room` (
	`id` integer PRIMARY KEY NOT NULL,
	`settings` text NOT NULL,
	`viewer_epoch` integer DEFAULT 1 NOT NULL,
	`session` text,
	`lease` integer DEFAULT 0 NOT NULL,
	`started` integer DEFAULT 0 NOT NULL,
	`ended` integer DEFAULT 0 NOT NULL,
	`call_id` text,
	`connect_lock` text,
	`seq` integer DEFAULT 0 NOT NULL,
	`job` text,
	`job_until` integer DEFAULT 0 NOT NULL,
	`revision` integer DEFAULT 0 NOT NULL,
	`caption` text DEFAULT '' NOT NULL,
	`source` text DEFAULT '' NOT NULL,
	`context` text DEFAULT '[]' NOT NULL,
	`expires` integer DEFAULT 0 NOT NULL,
	`hidden` integer DEFAULT 0 NOT NULL,
	`translation_cost` real DEFAULT 0 NOT NULL,
	`unknown_cost` integer DEFAULT 0 NOT NULL,
	`input_tokens` integer DEFAULT 0 NOT NULL,
	`output_tokens` integer DEFAULT 0 NOT NULL,
	`last_request` integer DEFAULT 0 NOT NULL
);
