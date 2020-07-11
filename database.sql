CREATE TABLE "user" (
	"id" serial NOT NULL UNIQUE,
	"username" varchar(320) NOT NULL UNIQUE,
	"password" varchar(255) NOT NULL,
	"first_name" varchar(255) NOT NULL,
	"last_name" varchar(255) NOT NULL,
	"avatar" varchar(255) NOT NULL DEFAULT 'images/default.png',
	"date_created" timestamp NOT NULL DEFAULT NOW(),
	CONSTRAINT "user_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "exercise" (
	"id" serial NOT NULL,
	"exercise_name" varchar(255) NOT NULL,
	"description" varchar(500) NOT NULL,
	"primary_group" varchar(255),
	"secondary_group" varchar(255),
	CONSTRAINT "exercise_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "muscle_group" (
	"id" serial NOT NULL,
	"name" varchar(255) NOT NULL UNIQUE,
	CONSTRAINT "muscle_group_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "bodyweight_history" (
	"id" serial NOT NULL,
	"date" DATE NOT NULL,
	"user_bodyweight" float4,
	"user_id" int NOT NULL,
	CONSTRAINT "bodyweight_history_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "set" (
	"id" serial NOT NULL,
	"rep" int,
	"weight" int,
	"history_id" int NOT NULL,
	"exercise_instance_id" int NOT NULL,
	"set_number" int NOT NULL,
	CONSTRAINT "set_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "workout" (
	"id" serial NOT NULL,
	"start_time" TIME,
	"end_time" TIME,
	"date" timestamp NOT NULL DEFAULT NOW(),
	"rating" int,
	"user_id" int NOT NULL,
	CONSTRAINT "workout_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "exercise_instance" (
	"id" serial NOT NULL,
	"workout_id" int NOT NULL,
	"exercise_id" int NOT NULL,
	CONSTRAINT "exercise_instance_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);




ALTER TABLE "exercise" ADD CONSTRAINT "exercise_fk0" FOREIGN KEY ("primary_group") REFERENCES "muscle_group"("name");
ALTER TABLE "exercise" ADD CONSTRAINT "exercise_fk1" FOREIGN KEY ("secondary_group") REFERENCES "muscle_group"("name");


ALTER TABLE "bodyweight_history" ADD CONSTRAINT "bodyweight_history_fk0" FOREIGN KEY ("user_id") REFERENCES "user"("id");

ALTER TABLE "set" ADD CONSTRAINT "set_fk0" FOREIGN KEY ("exercise_instance_id") REFERENCES "exercise_instance"("id");

ALTER TABLE "workout" ADD CONSTRAINT "workout_fk0" FOREIGN KEY ("user_id") REFERENCES "user"("id");

ALTER TABLE "exercise_instance" ADD CONSTRAINT "exercise_instance_fk0" FOREIGN KEY ("workout_id") REFERENCES "workout"("id");
ALTER TABLE "exercise_instance" ADD CONSTRAINT "exercise_instance_fk1" FOREIGN KEY ("exercise_id") REFERENCES "exercise"("id");

INSERT into "exercise" (exercise_name, description, primary_group, secondary_group)
VALUES
('arnold_press', 'This is a shoulder press that involves rotating the arms from a pronated to a supinated position', 'shoulders', 'chest'),
('back_extension', 'This is a lower back exercise in which the body is bent at the waist, typically over a hyperextension bench, exercise ball or other equipment', 'back', 'core'),
('bench_press', 'This is an exercise in which the weight is pressed upwards from a lying position on a bench', 'chest', 'triceps'),
('bicep_curl', 'This is an exercise in which weight is pulled using the biceps muscle in a "curling" movement of the elbow', 'biceps', 'forearms');

INSERT into "muscle_group" (name) 
VALUES
('calves'),
('hamstrings'),
('quads'),
('glutes'),
('back'),
('core'),
('chest'),
('triceps'),
('biceps'),
('forearms'),
('shoulders');

ALTER TABLE "set" ADD CONSTRAINT "set_fk1" FOREIGN KEY ("workout_id") REFERENCES "workout" ("id");

INSERT into "workout" (rating, user_id)
VALUES
('5', '1'); 

INSERT into "exercise_instance" (workout_id, exercise_id)
VALUES
('2', '5'),
('2', '6'),
('2', '7'),
('2', '8');

INSERT into "set" (set_number, rep, weight, workout_id, exercise_instance_id)
VALUES
('1', '12', '105', '2', '1'),
('2', '8', '135', '2', '1'),
('3', '5', '155', '2', '1'),
('4', '8', '135', '2', '1');

SELECT MAX(id) FROM "workout" where user_id = 1;
SELECT TOP 1 * FROM "workout"
ORDER BY id DESC;