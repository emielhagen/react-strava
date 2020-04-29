class Api::V1::ActivitiesController < ApplicationController
  def index
    if current_user.uid.nil?
      activities = Activity.where(user: current_user).sort_by(&:start_date).reverse
    elsif params[:user_id].blank?
      activities = Activity.where(strava_uid: current_user.uid).sort_by(&:start_date).reverse
    else
      user = User.find(params[:user_id])
      activities = Activity.where(strava_uid: user&.uid).sort_by(&:start_date).reverse
    end
    render json: activities
  end

  def update
    activity = Activity.find(params['id'])
    activity.update(strong_params)
    StravaApi.new(current_user).update_activity(activity)
    activities = Activity.where(strava_uid: current_user.uid).sort_by(&:start_date).reverse

    render json: activities
  end

  private

  def strong_params
    params.require(:activity).permit(:name, :description)
  end
end
