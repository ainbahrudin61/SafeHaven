
Rails.application.routes.draw do
  root "pages#home"

  get "what-is", to: "pages#what_is"
  get "contact", to: "pages#contact"
  get "law-enforcement", to: "pages#law_enforcement"
  get "enforcer", to: "pages#enforcer"
  get "hotline", to: "pages#hotline"
end
