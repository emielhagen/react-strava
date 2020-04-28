# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2020_04_21_080014) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "activities", force: :cascade do |t|
    t.integer "user_id"
    t.string "name"
    t.string "activity_type"
    t.string "description"
    t.integer "kudos_count"
    t.integer "comment_count"
    t.decimal "distance"
    t.decimal "moving_time"
    t.datetime "start_date"
    t.string "start_lat"
    t.string "start_lng"
    t.string "end_lat"
    t.string "end_lng"
    t.integer "athlete_count"
    t.decimal "average_speed"
    t.decimal "max_speed"
    t.decimal "average_cadence"
    t.decimal "average_temp"
    t.decimal "average_watts"
    t.decimal "calories"
    t.boolean "has_heartrate"
    t.decimal "average_heart_rate"
    t.decimal "max_heart_rate"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "strava_uid"
    t.string "strava_activity_id"
    t.string "polyline"
  end

  create_table "friendships", id: :serial, force: :cascade do |t|
    t.string "friendable_type"
    t.integer "friendable_id"
    t.integer "friend_id"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer "blocker_id"
    t.integer "status"
    t.index ["friendable_id", "friend_id"], name: "index_friendships_on_friendable_id_and_friend_id", unique: true
  end

  create_table "users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "provider"
    t.string "uid"
    t.string "username"
    t.string "profile_pic"
    t.string "access_token"
    t.string "refresh_token"
    t.integer "expires_at"
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

end
