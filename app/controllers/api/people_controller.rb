class Api::PeopleController < ApplicationController
  skip_before_filter :verify_authenticity_token

  def index
    person ||= Person.all
    render json: person
  end

  def create
    person = Person.create(person_params)
    if person.present?
      render json: person
    else
      error = "errors"
      render json: error
    end
  end

  private

  def person_params
    params.require(:person).permit(:first_name, :last_name, :email)
  end
end

