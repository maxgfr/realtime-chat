import Dependencies._

ThisBuild / scalaVersion     := "2.12.8"
ThisBuild / version          := "0.1.0-SNAPSHOT"
ThisBuild / organization     := "com.maxgfr"
ThisBuild / organizationName := "maxgfr"

lazy val root = (project in file("."))
  .settings(
    name := "analysis",
    libraryDependencies ++= Seq(
      scalaTest % Test,
      "net.debasishg" %% "redisclient" % "3.9",
      "com.redislabs" % "spark-redis" % "2.4.0",
      "org.apache.spark" %% "spark-core" % "2.4.3",
      "org.apache.spark" %% "spark-sql" % "2.4.3",
      "org.apache.spark" %% "spark-catalyst" % "2.4.3",
      "org.apache.spark" %% "spark-streaming" % "2.4.3"
    )
  )

// See https://www.scala-sbt.org/1.x/docs/Using-Sonatype.html for instructions on how to publish to Sonatype.
