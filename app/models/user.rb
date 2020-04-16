class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :omniauthable

  has_many :activities

  def self.from_omniauth(auth)
    user = User.find_by(provider: auth['provider'], uid: auth['uid'])

    if !user.present?
      user = User.create(user_hash(auth))
    elsif DateTime.strptime(user.expires_at.to_s, '%s') < DateTime.now
      user.update(access_token: auth['credentials']['token'],
                  refresh_token: auth['credentials']['refresh_token'],
                  expires_at: auth['credentials']['expires_at'])
    end
    user
  end

  def user_hash(auth_hash)
    {
      provider: auth_hash['provider'],
      uid: auth_hash['uid'],
      username: auth_hash['extra']['raw_info']['username'],
      profile_pic: auth_hash['extra']['raw_info']['profile_medium'],
      access_token: auth_hash['credentials']['token'],
      refresh_token: auth_hash['credentials']['refresh_token'],
      expires_at: auth_hash['credentials']['expires_at']
    }
  end

  def self.new_with_session(params, session)
    if session["devise.user_attributes"]
      new(session["devise.user_attributes"]) do |user|
        user.attributes = params
        user.valid?
      end
    else
      super
    end
  end

  def password_required?
    super && provider.blank?
  end
end
