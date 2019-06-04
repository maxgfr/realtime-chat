package maxgfr

import org.apache.spark.sql.SparkSession
import org.apache.spark.sql.functions._
import org.apache.spark.sql.types._
import com.redislabs.provider.redis._

object Main extends App {

    val spark = SparkSession
              .builder()
              .appName("redis-analysis")
              .master("local[*]")
              .config("spark.redis.host", "redis")
              .config("spark.redis.port", "6379")
              .getOrCreate()

    val str = spark
                .readStream
                .format("redis")
                .option("stream.keys","stream")
                .schema(StructType(Array(
                      StructField("data", StringType)
                 )))
                 .load()

    val dataframe = str.groupBy("data").count

    val query = dataframe
               .writeStream
               .outputMode("update")
               .format("console")
               .start()

    query.awaitTermination()

}
