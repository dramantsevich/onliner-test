@OnlinerFunctionality
Feature: Onliner feature
    @TC1
   Scenario: user views the news and puts a reaction
      Given user navigates to "https://www.onliner.by/"
      When user is on home page
      When user click on "Sign_In" button
      And user enter email on Login page
      And user enter password on Login page
      When user click on "Login" button
      When user is on home page
      And user click on "1" News on Home page
      Then user see Heading on "News" page
      And user see same Category on News page
      And user click on "2" Reaction on News page
      Then user see selected Reaction on News page
      And user click on "3" Popular News on News page
      Then user see Heading on "Popular News" page
      And user logout the application
       When user is on home page

    @TC2
   Scenario Outline: user login into onliner and get to cart item
      Given user navigates to "https://www.onliner.by/"
      When user is on home page
      When user click on "Sign_In" button
      And user enter email on Login page
      And user enter password on Login page
      When user click on "Login" button
      When user is on home page
      And user click on "Каталог" Navigation Menu
      Then user see Heading on "Catalog" page
      And user click on "1" Catalog Navigation Classifier on Catalog page
      And user mouseover on "Мобильные телефоны и аксессуары" Catalog Navigation List Item on Catalog page
      Then user see Catalog Navigation active List Item
      And user click on "Мобильные телефоны" Dropdown Navigation List Item on Catalog page
      Then user see Heading on "Mobile Phones Catalog" page
      And user click on "<product1>" Mobile Phone on Mobile Phones Catalog
      Then user see Heading on "Product" page
      When user click on "Предложений" button
      And user click on "1" Offers list item on Product page
      Then user see Buy Button is green on Product Page
      When user enter "<product2>" on Search Input
      Then user see "<product2>" on Search Window Input
      And user click on "<product2>" Item on Search window
      Then user see Heading on "Product" page
      When user click on "Предложений" button
      And user click on "1" Offers list item on Product page
      Then user see Buy Button is green on Product Page
      When user click on "В корзине" button
      Then user see Heading on "Cart" page
      Then user see "<product1>" product contains in Cart page
      Then user see "<product2>" product contains in Cart page
      And user remove all Items on Cart page
      Then user see confirm Remove message on Cart page
      When user click on Logo on Cart page
      When user is on home page
      And user logout the application
       When user is on home page

      Examples:
           | product1                                                  | product2                                              |
           | HONOR 10X Lite DNN-LX9 4GB/128GB (ультрафиолетовый закат) | Xiaomi Redmi 9A 2GB/32GB международная версия (серый) |