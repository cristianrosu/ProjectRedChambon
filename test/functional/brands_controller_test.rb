require 'test_helper'

class BrandsControllerTest < ActionController::TestCase
  setup do
    @brand = brands(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:brands)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create brand" do
    assert_difference('Brand.count') do
      post :create, brand: { contact_name: @brand.contact_name, description: @brand.description, email: @brand.email, latitude: @brand.latitude, location: @brand.location, logo: @brand.logo, longitude: @brand.longitude, name: @brand.name, phone_number: @brand.phone_number, user_id: @brand.user_id, website: @brand.website }
    end

    assert_redirected_to brand_path(assigns(:brand))
  end

  test "should show brand" do
    get :show, id: @brand
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @brand
    assert_response :success
  end

  test "should update brand" do
    put :update, id: @brand, brand: { contact_name: @brand.contact_name, description: @brand.description, email: @brand.email, latitude: @brand.latitude, location: @brand.location, logo: @brand.logo, longitude: @brand.longitude, name: @brand.name, phone_number: @brand.phone_number, user_id: @brand.user_id, website: @brand.website }
    assert_redirected_to brand_path(assigns(:brand))
  end

  test "should destroy brand" do
    assert_difference('Brand.count', -1) do
      delete :destroy, id: @brand
    end

    assert_redirected_to brands_path
  end
end
