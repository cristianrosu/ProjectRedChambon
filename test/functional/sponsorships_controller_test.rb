require 'test_helper'

class SponsorshipsControllerTest < ActionController::TestCase
  setup do
    @sponsorship = sponsorships(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:sponsorships)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create sponsorship" do
    assert_difference('Sponsorship.count') do
      post :create, sponsorship: { date_end: @sponsorship.date_end, date_start: @sponsorship.date_start, description: @sponsorship.description, image: @sponsorship.image, industry_id: @sponsorship.industry_id, latitude: @sponsorship.latitude, location: @sponsorship.location, longitude: @sponsorship.longitude, sponsorship_type_id: @sponsorship.sponsorship_type_id, title: @sponsorship.title }
    end

    assert_redirected_to sponsorship_path(assigns(:sponsorship))
  end

  test "should show sponsorship" do
    get :show, id: @sponsorship
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @sponsorship
    assert_response :success
  end

  test "should update sponsorship" do
    put :update, id: @sponsorship, sponsorship: { date_end: @sponsorship.date_end, date_start: @sponsorship.date_start, description: @sponsorship.description, image: @sponsorship.image, industry_id: @sponsorship.industry_id, latitude: @sponsorship.latitude, location: @sponsorship.location, longitude: @sponsorship.longitude, sponsorship_type_id: @sponsorship.sponsorship_type_id, title: @sponsorship.title }
    assert_redirected_to sponsorship_path(assigns(:sponsorship))
  end

  test "should destroy sponsorship" do
    assert_difference('Sponsorship.count', -1) do
      delete :destroy, id: @sponsorship
    end

    assert_redirected_to sponsorships_path
  end
end
