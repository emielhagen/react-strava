class AddUidToActivity < ActiveRecord::Migration[6.0]
  def change
    add_column :activities, :strava_uid, :string
    add_column :activities, :strava_activity_id, :string
  end
end
