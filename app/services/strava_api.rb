# Playground: https://developers.strava.com/playground/#/Activities/getLoggedInAthleteActivities
# Api documentation: https://developers.strava.com/docs/authentication/
class StravaApi
  include HTTParty
  attr_reader :user

  def initialize(user)
    @user = user
  end

  def get_athlete_activities(page = 1)
    page_nr = page
    response = HTTParty.get("https://www.strava.com/api/v3/athletes/#{user.uid}/activities?page=#{page_nr}",
                            headers: { "Authorization" => "Bearer #{user.access_token}" })

    # TODO: Error handling
    return [] if response.code != 200

    map_response_to_activities(response)
    return if response.count < 30

    get_athlete_activities(page_nr + 1)
  end

  # Not yet used
  def get_athlete_activity(activity)
    HTTParty.get("https://www.strava.com/api/v3/activities/#{activity.strava_activity_id}",
                 headers: { "Authorization" => "Bearer #{user.access_token}" })
  end

  def update_activity(activity)
    body = { "description": activity.description, "name": activity.name }
    HTTParty.put("https://www.strava.com/api/v3/activities/#{activity.strava_activity_id}",
                 headers: { "Authorization" => "Bearer #{user.access_token}" }, body: body)
  end

  def map_response_to_activities(response)
    response.each do |activity|
      Activity.where(activity_hash(activity)).first_or_create(name: activity['name'])
    end
  end

  def activity_hash(activity)
    {
      user: user, strava_uid: activity['athlete']['id'],
      strava_activity_id: activity['id'],
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
      max_heart_rate: activity['max_heartrate'],
      polyline: activity['map']['summary_polyline']
    }
  end
end
