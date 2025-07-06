Feature: selection of tickets

   
    Scenario: success booking
        Given user is on page
        When user search by text
        Then user sees text "Сталкер(1979)"


    Scenario: Booking a ticket
        Given user is on page
        When user selects day and the time of the session
        When user book ticket
        Then user sees booking "Электронный билет"


     Scenario: selecting a occupied seat
        Given user is on page
        When user selects busy place 
        Then the book button is not active 