Rails.application.routes.draw do
  root 'home#welcome'

  namespace :api do
    resources :people, only: [:index,:create, :destroy]
  end
end
