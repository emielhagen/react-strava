Rails.application.routes.draw do
  get 'activities/index'

  devise_for :users, controllers: { omniauth_callbacks: 'omniauth_callbacks'}

  root to: 'pages#home'

  namespace :api, defaults: { format: :json } do
    namespace :v1 do
      resources :activities, only: [:index, :update]
      resources :users, only: [:index, :update]
    end
  end

  get '/connect_friends', to: 'activities#index'


  resources :activities, only: :index
end
