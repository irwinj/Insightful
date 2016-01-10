Rails.application.routes.draw do
  root 'personalities#index'
  devise_for :users
    resources :user
end
