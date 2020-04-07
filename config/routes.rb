Rails.application.routes.draw do
  get 'activities/index'
  devise_for :users
  root to: 'pages#home'

  resources :activities, only: :index
end
