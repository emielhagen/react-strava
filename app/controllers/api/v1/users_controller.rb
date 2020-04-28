class Api::V1::UsersController < ApplicationController
  def index
    case params[:type]
    when 'friends'
      users = current_user.friends
    when 'incoming_requests'
      users = current_user.requested_friends
    else
      friend_ids = current_user.friends&.pluck(:id)
      pending_ids = current_user.pending_friends&.pluck(:id)
      incoming_request_ids = current_user.requested_friends&.pluck(:id)
      users = User.where.not(id: friend_ids + pending_ids + incoming_request_ids << current_user.id)
    end

    render json: users
  end

  def update
    @user = User.find(params[:id])
    request = params[:user][:request]

    case request
    when 'friend_request'
      current_user.friend_request(@user)
    when 'confirm_friend_request'
      current_user.accept_request(@user)
    when 'decline_friend_request'
      current_user.decline_request(@user)
    when 'remove_friend'
      current_user.remove_friend(@user)
    end

    users = User.where.not(id: [current_user.id, @user.id]) if request == 'friend_request'
    users = User.where.not(id: current_user.id) if request == 'remove_friend'
    users = User.where.not(id: current_user.id) if request == 'confirm_friend_request'
    users = User.where.not(id: current_user.id) if request == 'decline_friend_request'

    render json: users
  end

  private

  def strong_params
  end
end
