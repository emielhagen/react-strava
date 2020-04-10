class CreateActivities < ActiveRecord::Migration[6.0]
  def change
    create_table :activities do |t|
      t.integer :user_id
      t.string :name
      t.string :activity_type
      t.string :description
      t.integer :kudos_count
      t.integer :comment_count
      t.decimal :distance
      t.decimal :moving_time
      t.datetime :start_date
      t.string :start_lat
      t.string :start_lng
      t.string :end_lat
      t.string :end_lng
      t.integer :athlete_count
      t.decimal :average_speed
      t.decimal :max_speed
      t.decimal :average_cadence
      t.decimal :average_temp
      t.decimal :average_watts
      t.decimal :calories
      t.boolean :has_heartrate
      t.decimal :average_heart_rate
      t.decimal :max_heart_rate

      t.timestamps
    end
  end
end
