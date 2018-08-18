# frozen_string_literal: true

require "sinatra/base"

class FakeServer < Sinatra::Base
  private

  def json_response(response_code, file_name)
    content_type :json
    status response_code
    parsed_file = parse_file(file_name)

    yield parsed_file if block_given?
    parsed_file.to_json
  end

  def xml_response(response_code, file_name)
    content_type :xml
    status response_code
    parsed_file = parse_file(file_name, :xml)

    yield parsed_file if block_given?
    parsed_file.to_xml
  end

  def parse_file(file_name, type = :json)
    file_contents = File.open(file_path(file_name), "rb").read

    if type == :json
      JSON.parse(file_contents)
    else
      Nokogiri::XML.parse(file_contents)
    end
  end

  def file_path(file_name)
    File.dirname(__FILE__) + "/fixtures/" + file_name
  end
end
