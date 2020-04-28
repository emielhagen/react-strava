class ApplicationController < ActionController::Base
  before_action :authenticate_user!
  before_action :configure_permitted_parameters, if: :devise_controller?
  before_action :set_friend_requests

  # def after_sign_in_path_for(resource)
  #   activities_path || welcome_path
  # end

  protected

  def set_friend_requests
    return if current_user.nil?

    @requested_friends = current_user.requested_friends.count > 0 ? current_user.requested_friends.count : ''
  end

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(%i[provider uid email])
  end
end
