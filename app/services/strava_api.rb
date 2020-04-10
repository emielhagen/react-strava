# Playground: https://developers.strava.com/playground/#/Activities/getLoggedInAthleteActivities
# Api documentation: https://developers.strava.com/docs/authentication/
class StravaApi
  include HTTParty
  attr_reader :access_token, :refresh_token, :uid, :user

  def initialize(user)
    @access_token = user.access_token
    @refresh_token = user.refresh_token
    @uid = user.uid
    @user = user
  end

  def get_athlete_activities
    response = HTTParty.get("https://www.strava.com/api/v3/athletes/#{user.uid}/activities", headers: {"Authorization" => "Bearer #{access_token}" })
    map_response_to_activities(response)
  end

  # Not yet used
  def get_athlete_activity
    response = HTTParty.get("https://www.strava.com/api/v3/activity/#{activity.strava_activity_id}", headers: {"Authorization" => "Bearer #{access_token}" })
  end

  def map_response_to_activities(response)
    response.each do |activity|
      Activity.where(create_activity_hash(activity)).first_or_create
    end
  end

  def create_activity_hash(activity)
    activity_hash = {
      user: user,
      strava_uid: activity['athlete']['id'],
      strava_activity_id: activity['id'],
      name: activity['name'],
      activity_type: activity['type'],
      kudos_count: activity['kudos_count'],
      comment_count: activity['comment_count'],
      distance: activity['distance'],
      moving_time: activity['moving_time'],
      start_date: activity['start_date'],
      start_lat: activity['start_latitude'],
      start_lng: activity['start_longitude'],
      end_lat: activity['end_latlng']&.first,
      end_lng: activity['end_latlng']&.second,
      athlete_count: activity['athlete_count'],
      average_speed: activity['average_speed'],
      max_speed: activity['max_speed'],
      average_cadence: activity['average_cadence'],
      average_temp: activity['average_temp'],
      average_watts: activity['average_watts'],
      average_heart_rate: activity['average_heartrate'],
      max_heart_rate: activity['max_heartrate']
    }
  end
end
