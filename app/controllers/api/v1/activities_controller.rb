class Api::V1::ActivitiesController < ApplicationController
  def index
    if current_user.uid.nil?
      activities = Activity.where(user: current_user)
    else
      activities = Activity.where(strava_uid: current_user.uid)
    end
    render json: activities
  end

  def create
  end
end
