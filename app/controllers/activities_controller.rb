class ActivitiesController < ApplicationController
  def index
    return if params[:friend_id].nil?

    @user = User.find(params[:friend_id])
    current_user.handle_request(@user, params[:request])
  end
end
