ProjectRedChambon::Application.routes.draw do


 #match "events/new" => "admin#new"
 #match "events/:id/edit" => "admin#edit"
 get "events/map"
 get "sponsorships/map"

 post "events/:id/save_block" => "events#save_block"
 post "events/:id/save_block_order" => "events#save_block_order"
 post "events/create_block" => "events#create_block"
 post "events/create_section" => "events#create_section"
 post "events/create_sponsorship_block" => "events#create_sponsorship_block"
 post "events/destroy_block" => "events#destroy_block"
 

 get  "events/:id/edit_step2" => "events#edit_step2"
 
 post "admin/volunteers" => "admin#volunteers"
 post "admin/sponsors" => "admin#sponsors"

 get "admin/event/:id/edit" => "events#edit"
 get "admin/event/new" => "events#new"
 
 resources :events 

 resources :brands

 resources :sponsorships

 resources :pictures, only: [:create, :destroy]

get "home/index"
get "home/contact"
get "home/about"



get "admin/index"
get "admin/new"

match "home" => "home#index"
match "events" => "events#index"
match "admin" => "admin#index"

get 'tags/:tag', to: 'events#index', as: :tag

#post 'events/:id/upload' => 'events#upload'
#post 'events/:id' => 'events#update'



  devise_for :users, path_names: {sign_in: "login", sign_out: "logout"},
                     controllers: {omniauth_callbacks: "oauth_callbacks"} #omniauth_callbacks



  root :to => "home#index"
  # The priority is based upon order of creation:
  # first created -> highest priority.

  # Sample of regular route:
  #   match 'products/:id' => 'catalog#view'
  # Keep in mind you can assign values other than :controller and :action

  # Sample of named route:
  #   match 'products/:id/purchase' => 'catalog#purchase', :as => :purchase
  # This route can be invoked with purchase_url(:id => product.id)

  # Sample resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Sample resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Sample resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Sample resource route with more complex sub-resources
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', :on => :collection
  #     end
  #   end

  # Sample resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end

  # You can have the root of your site routed with "root"
  # just remember to delete public/index.html.
  # root :to => 'welcome#index'

  # See how all your routes lay out with "rake routes"

  # This is a legacy wild controller route that's not recommended for RESTful applications.
  # Note: This route will make all actions in every controller accessible via GET requests.
  # match ':controller(/:action(/:id))(.:format)'
end
