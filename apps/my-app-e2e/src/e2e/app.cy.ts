import { getGreeting } from '../support/app.po';

describe('my-app', () => {
    beforeEach(() => {

        cy.intercept('POST', 'http://localhost:3333/auth-api/login', (res) => {
            res.reply({
                statusCode: 201,
                body:
                    {
                        "results": {
                            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRob21hcyIsImlkIjoiZjgzNzIxN2EtMzg2Ni00ZjcwLWFjMTEtYWZkNmViYmRmYmM5IiwiaWF0IjoxNjc0NTg1NjIzfQ.ovk4p8d45cP0ZaUbkDxnDh7XWMQG_Skw-zv61agJjO0",
                            "id": "f837217a-3866-4f70-ac11-afd6ebbdfbc9",
                            "username": "thomasCypress",
                            "password": ""
                        },
                        "info": {
                            "version": "1.0",
                            "type": "object",
                            "count": 1
                        }
                    }
            });
        });

        cy.intercept('GET', 'http://localhost:3333/data-api/product', (res) => {
            res.reply({
                statusCode: 200,
                body:
                    {
                        "results": [
                            {
                                "_id": "639682fda2af149b347872a3",
                                "id": "49986846-093a-4c9a-ad69-532dd8772751",
                                "author": "Kait",
                                "name": "Prayer Plant Cypress",
                                "description": "Grows best in indirect sunlight  Keep soil evenly moist; do not let it sit in water or dry out",
                                "image": "https://www.plants.com/images/r_400_177045MA_20220221-1645467440145.webp",
                                "quantity": 7,
                                "price": 54,
                                "reviews": [
                                    {
                                        "productId": "49986846-093a-4c9a-ad69-532dd8772751",
                                        "authorId": "0c5ab817-21c0-4379-a2ad-b85d9ac487d5",
                                        "author": "BorkX1553",
                                        "description": "Okay this is a decent plant iguess...",
                                        "rating": 7,
                                        "_id": "639b42657fd6c25d508bb6c3",
                                        "id": "ef292f26-b86e-4bdd-9ec2-58135782ad0a",
                                        "datetime": "2022-12-15T15:51:01.212Z"
                                    },
                                    {
                                        "productId": "49986846-093a-4c9a-ad69-532dd8772751",
                                        "authorId": "d3ccef81-91c8-413f-9238-8576d2df6f7b",
                                        "author": "Harry401",
                                        "description": "Decent....",
                                        "rating": 5,
                                        "_id": "639b5580737ceb77ce3e3acd",
                                        "id": "d53dc7a4-e532-455e-a969-08b366942ae6",
                                        "datetime": "2022-12-15T17:12:32.835Z"
                                    }
                                ],
                                "category": [
                                    "Beginner plants"
                                ],
                                "rating": {
                                    "rating": 6
                                }
                            },
                            {
                                "_id": "639b4c95737ceb77ce3e3a92",
                                "id": "d0e5f0e7-0ade-4e9a-a131-0cb1051c7123",
                                "author": "XwhiSprsX",
                                "name": "SWEET HEART BAMBOO",
                                "description": "Best in 3-4 hours of bright filtered sunlight  Once a week or when dry",
                                "image": "https://www.plants.com/images/r_400_177023_S3_SweetheartBamboo_20200118-1579315138803.webp",
                                "quantity": 10,
                                "price": 12,
                                "reviews": [
                                    {
                                        "productId": "d0e5f0e7-0ade-4e9a-a131-0cb1051c7123",
                                        "authorId": "d102b7f8-8bf5-41a8-9298-d8464e0f83a4",
                                        "author": "XwhiSprsX",
                                        "description": "LEUK!",
                                        "rating": 10,
                                        "_id": "639b54d0737ceb77ce3e3a9d",
                                        "id": "5ad1e8bb-4425-4472-8de2-5be13a2cb51a",
                                        "datetime": "2022-12-15T17:09:36.582Z"
                                    },
                                    {
                                        "productId": "d0e5f0e7-0ade-4e9a-a131-0cb1051c7123",
                                        "authorId": "d3ccef81-91c8-413f-9238-8576d2df6f7b",
                                        "author": "Harry401",
                                        "description": "Better!",
                                        "rating": 7,
                                        "_id": "639b5596737ceb77ce3e3adb",
                                        "id": "4aa17b05-a743-48fa-bc70-993b97e24993",
                                        "datetime": "2022-12-15T17:12:54.956Z"
                                    }
                                ],
                                "category": [
                                    "Beginner plants"
                                ],
                                "rating": {
                                    "rating": 8.5
                                }
                            },
                            {
                                "_id": "639b4b45737ceb77ce3e3a89",
                                "id": "7bb3fae1-b8db-4f3f-89ef-3d9252502575",
                                "author": "XwhiSprsX",
                                "name": "MASS CANE FLOOR PLANT",
                                "description": "Bright, indirect light but can handle low light levels too  Water when top ½\" of soil is dry to the touch",
                                "image": "https://www.plants.com/images/r_400_157705L3DS_20220221-1645471907415.webp",
                                "quantity": 25,
                                "price": 12,
                                "reviews": [
                                    {
                                        "productId": "7bb3fae1-b8db-4f3f-89ef-3d9252502575",
                                        "authorId": "d102b7f8-8bf5-41a8-9298-d8464e0f83a4",
                                        "author": "XwhiSprsX",
                                        "description": "Bad plant..",
                                        "rating": 1,
                                        "_id": "639b54e4737ceb77ce3e3aa7",
                                        "id": "9487d31b-80d0-4bc7-b9b8-9101ce443da4",
                                        "datetime": "2022-12-15T17:09:56.283Z"
                                    },
                                    {
                                        "productId": "7bb3fae1-b8db-4f3f-89ef-3d9252502575",
                                        "authorId": "d3ccef81-91c8-413f-9238-8576d2df6f7b",
                                        "author": "Harry401",
                                        "description": "It smells!",
                                        "rating": 3,
                                        "_id": "639b558b737ceb77ce3e3ad4",
                                        "id": "b52cf71d-90cb-4511-bc53-750dc3f4593f",
                                        "datetime": "2022-12-15T17:12:43.705Z"
                                    }
                                ],
                                "category": [
                                    "Beginner plants",
                                    "Pet friendly"
                                ],
                                "rating": {
                                    "rating": 2
                                }
                            },
                            {
                                "_id": "639b5544737ceb77ce3e3abf",
                                "id": "776ff71a-6f00-4d3c-8b7c-a181cd2509f9",
                                "author": "Harry401",
                                "name": "HOYA HEART SUCCULENT",
                                "description": "Keep in bright artificial light indoors or near a window without direct sun  Allow plants to dry before watering",
                                "image": "https://www.plants.com/images/r_400_177062D_20200929-1601388831633.webp",
                                "quantity": 2,
                                "price": 12,
                                "reviews": [],
                                "category": [
                                    "Beginner plants"
                                ],
                                "rating": {
                                    "rating": null
                                }
                            },
                            {
                                "_id": "63967c84a2af149b34787250",
                                "id": "dd83e10d-dcf5-44a1-8579-8c4099a500bf",
                                "author": "thomas",
                                "name": "Money Tree plant",
                                "description": "Money Tree Plant features a uniquely braided trunk with clusters of green leaves at top Arrives potted in your choice of planter: Exclusive Domain™ planter, an earthy design that includes a collapsible wooden stand providing a modern lift to display your plant flawlessly; available in Snowcap, Granite, Midnight and Rust; break-resistant and watertight; Stand can be displayed with two height options Exclusive Artisan™ basket in hand woven banana leaf highlighting the coloration of the natural fibers; durable woven handles make it an easy tote for moving plants from place to place Exclusive Sandstone™ planter: a versatile, neutral container with ribbed border detail at rim and contoured base; break-resistant and watertight Large plant measures overall approximately 39-40\"H x 9.5\"D potted at the time of purchase Medium plant measures overall approximately 16-20\"H x 6\"D potted at the time of purchase",
                                "image": "https://www.plants.com/images/r_400_157651MDC_20220221-1645469235331.webp",
                                "quantity": 7,
                                "price": 45.55,
                                "reviews": [],
                                "category": [
                                    "Beginner plants",
                                    "Pet friendly"
                                ],
                                "rating": {
                                    "rating": null
                                }
                            },
                            {
                                "_id": "63958d3c858dacf8b542ec10",
                                "id": "b0df9902-eeff-4ac7-af2b-13af6982718e",
                                "author": "thomas",
                                "name": "Snake plant For inside",
                                "description": "snake plant",
                                "image": "https://www.plants.com/images/r_400_157646MA_20220329-1648582013950.webp",
                                "quantity": 3,
                                "price": 4,
                                "reviews": [
                                    {
                                        "productId": "b0df9902-eeff-4ac7-af2b-13af6982718e",
                                        "authorId": "a389fddc-4376-49e1-8853-2518d29602ec",
                                        "author": "Kait",
                                        "description": "asd",
                                        "rating": 7,
                                        "_id": "639675e2a2af149b3478721b",
                                        "id": "da2d8769-7a32-46d4-8cdc-803086d174d8",
                                        "datetime": "2022-12-12T00:29:22.830Z"
                                    },
                                    {
                                        "productId": "b0df9902-eeff-4ac7-af2b-13af6982718e",
                                        "authorId": "d102b7f8-8bf5-41a8-9298-d8464e0f83a4",
                                        "author": "XwhiSprsX",
                                        "description": "Okay thats The best plant ever!!",
                                        "rating": 9,
                                        "_id": "639b49e6737ceb77ce3e3a4c",
                                        "id": "99469201-8d3c-4d7d-ae84-e8ade1fc97b0",
                                        "datetime": "2022-12-15T16:23:02.757Z"
                                    },
                                    {
                                        "productId": "b0df9902-eeff-4ac7-af2b-13af6982718e",
                                        "authorId": "d3ccef81-91c8-413f-9238-8576d2df6f7b",
                                        "author": "Harry401",
                                        "description": "This is a odd plant...",
                                        "rating": 6,
                                        "_id": "639b55ea737ceb77ce3e3aeb",
                                        "id": "5194a365-d783-4279-811a-75b1eb51a12c",
                                        "datetime": "2022-12-15T17:14:18.040Z"
                                    }
                                ],
                                "category": [
                                    "Beginner plants"
                                ],
                                "rating": {
                                    "rating": 7.333333333333333
                                }
                            },
                            {
                                "_id": "6398e44eaa7b06f004c9b504",
                                "id": "00aca83c-4759-4649-a8fa-52647e00bc99",
                                "author": "BorkX1553",
                                "name": "Fake plant!",
                                "description": "This is just a fake plant. Not much to it. Just fake. Not even a real plant pfft...",
                                "image": "https://static.vecteezy.com/system/resources/previews/002/425/076/non_2x/plant-leaves-in-a-pot-beautiful-green-houseplant-isolated-simple-trendy-flat-style-for-interior-garden-decoration-design-free-vector.jpg",
                                "quantity": 4,
                                "price": 13,
                                "reviews": [
                                    {
                                        "productId": "00aca83c-4759-4649-a8fa-52647e00bc99",
                                        "authorId": "d3ccef81-91c8-413f-9238-8576d2df6f7b",
                                        "author": "Harry401",
                                        "description": "Not even a picture pffft... Didn't expect to get a literal piece of paper of a 2D plant!?",
                                        "rating": 1,
                                        "_id": "639b5576737ceb77ce3e3ac6",
                                        "id": "d5216966-64f2-42d3-a3da-c54cd96518ad",
                                        "datetime": "2022-12-15T17:12:22.470Z"
                                    }
                                ],
                                "category": [
                                    "Beginner plants",
                                    "Air purifying",
                                    "Pet friendly"
                                ],
                                "rating": {
                                    "rating": 1
                                }
                            }
                        ],
                        "info": {
                            "version": "1.0",
                            "type": "list",
                            "count": 7
                        }
                    }
            });
        });

        cy.intercept('GET', 'http://localhost:3333/data-api/product/49986846-093a-4c9a-ad69-532dd8772751', (res) => {
            res.reply({
                statusCode: 201,
                body:
                    {
                        "results": {
                            "_id": "639682fda2af149b347872a3",
                            "id": "49986846-093a-4c9a-ad69-532dd8772751",
                            "author": "Kait",
                            "authorId": "a389fddc-4376-49e1-8853-2518d29602ec",
                            "name": "Prayer Plant Cypress",
                            "description": "Grows best in indirect sunlight  Keep soil evenly moist; do not let it sit in water or dry out",
                            "image": "https://www.plants.com/images/r_400_177045MA_20220221-1645467440145.webp",
                            "quantity": 7,
                            "price": 54,
                            "reviews": [
                                {
                                    "productId": "49986846-093a-4c9a-ad69-532dd8772751",
                                    "authorId": "0c5ab817-21c0-4379-a2ad-b85d9ac487d5",
                                    "author": "BorkX1553",
                                    "description": "Okay this is a decent plant iguess...",
                                    "rating": 7,
                                    "_id": "639b42657fd6c25d508bb6c3",
                                    "id": "ef292f26-b86e-4bdd-9ec2-58135782ad0a",
                                    "datetime": "2022-12-15T15:51:01.212Z"
                                },
                                {
                                    "productId": "49986846-093a-4c9a-ad69-532dd8772751",
                                    "authorId": "d3ccef81-91c8-413f-9238-8576d2df6f7b",
                                    "author": "Harry401",
                                    "description": "Decent....",
                                    "rating": 5,
                                    "_id": "639b5580737ceb77ce3e3acd",
                                    "id": "d53dc7a4-e532-455e-a969-08b366942ae6",
                                    "datetime": "2022-12-15T17:12:32.835Z"
                                }
                            ],
                            "category": [
                                "Beginner plants"
                            ],
                            "rating": {
                                "rating": 6
                            }
                        },
                        "info": {
                            "version": "1.0",
                            "type": "object",
                            "count": 1
                        }
                    }
            });
        });

        cy.intercept('POST', 'http://localhost:3333/data-api/review/49986846-093a-4c9a-ad69-532dd8772751', (res) => {
            res.reply({
                statusCode: 201,
                body:
                    {
                        "results": {
                            "productId": "49986846-093a-4c9a-ad69-532dd8772751",
                            "message": "Review added successfully (Cypress)",
                        }
                    }
            });
        });

        cy.visit('http://localhost:4200/login')
        cy.get('#username').type('thomas')
        cy.get('#password').type('fakePasswordForSure')
        cy.get('button').contains('LOGIN').click()
    })

  it('Should find a product, and post a valid comment for the product. The comment is now shown in the comment section.', () => {
      cy.get('a').contains('Sellers').click().wait(100);
        cy.get('#productCards').find('#individualCard').find('h3').contains('Prayer Plant Cypress').click().wait(100);
        cy.url().should('include', '/sellers/49986846-093a-4c9a-ad69-532dd8772751');
        cy.get('input').type('This is a comment');

      cy.intercept('GET', 'http://localhost:3333/data-api/product/49986846-093a-4c9a-ad69-532dd8772751', (res) => {
          res.reply({
              statusCode: 201,
              body:
                  {
                      "results": {
                          "_id": "639682fda2af149b347872a3",
                          "id": "49986846-093a-4c9a-ad69-532dd8772751",
                          "author": "Kait",
                          "authorId": "a389fddc-4376-49e1-8853-2518d29602ec",
                          "name": "Prayer Plant Cypress",
                          "description": "Grows best in indirect sunlight  Keep soil evenly moist; do not let it sit in water or dry out",
                          "image": "https://www.plants.com/images/r_400_177045MA_20220221-1645467440145.webp",
                          "quantity": 7,
                          "price": 54,
                          "reviews": [
                              {
                                  "productId": "49986846-093a-4c9a-ad69-532dd8772751",
                                  "authorId": "0c5ab817-21c0-4379-a2ad-b85d9ac487d5",
                                  "author": "BorkX1553",
                                  "description": "Okay this is a decent plant iguess...",
                                  "rating": 7,
                                  "_id": "639b42657fd6c25d508bb6c3",
                                  "id": "ef292f26-b86e-4bdd-9ec2-58135782ad0a",
                                  "datetime": "2022-12-15T15:51:01.212Z"
                              },
                              {
                                  "productId": "49986846-093a-4c9a-ad69-532dd8772751",
                                  "authorId": "d3ccef81-91c8-413f-9238-8576d2df6f7b",
                                  "author": "Harry401",
                                  "description": "Decent....",
                                  "rating": 5,
                                  "_id": "639b5580737ceb77ce3e3acd",
                                  "id": "d53dc7a4-e532-455e-a969-08b366942ae6",
                                  "datetime": "2022-12-15T17:12:32.835Z"
                              },
                              {
                                  "productId": "49986846-093a-4c9a-ad69-532dd8772752",
                                  "authorId": "d3ccef81-91c8-413f-9238-8576d2df6f72",
                                  "author": "Thomas",
                                  "description": "This is a comment",
                                  "rating": 5,
                                  "_id": "639b5580737ceb77ce3e3acd",
                                  "id": "d53dc7a4-e532-455e-a969-08b366942ae6",
                                  "datetime": "2022-12-15T17:12:32.835Z"
                              }
                          ],
                          "category": [
                              "Beginner plants"
                          ],
                          "rating": {
                              "rating": 6
                          }
                      },
                      "info": {
                          "version": "1.0",
                          "type": "object",
                          "count": 1
                      }
                  }
          });
      });

        cy.get('ngb-rating[aria-valuenow="NaN"]').click();
        cy.get('.icon').click();
        cy.get('div').contains('This is a comment').should('be.visible');
  });



    it('When pressed the checkmark on Friends interests, a new list of products should be shown.', () => {
        cy.intercept('GET', 'http://localhost:3333/data-api/follow/interests', (res) => {
            res.reply({
                statusCode: 201,
                body:
                    {
                        "results": [
                            {
                                "image": "https://www.plants.com/images/r_400_177045MA_20220221-1645467440145.webp",
                                "quantity": 12,
                                "price": 54,
                                "name": "Cypress Prayer Plant",
                                "description": "Grows best in indirect sunlight  Keep soil evenly moist; do not let it sit in water or dry out",
                                "id": "49986846-093a-4c9a-ad69-532dd8772751",
                                "category": [
                                    "Beginner plants"
                                ]
                            },
                            {
                                "image": "https://www.plants.com/images/r_400_157651MDC_20220221-1645469235331.webp",
                                "quantity": 12,
                                "price": 45.55,
                                "name": "Cypress Money Tree plant",
                                "description": "Money Tree Plant features a uniquely braided trunk with clusters of green leaves at top Arrives potted in your choice of planter: Exclusive Domain™ planter, an earthy design that includes a collapsible wooden stand providing a modern lift to display your plant flawlessly; available in Snowcap, Granite, Midnight and Rust; break-resistant and watertight; Stand can be displayed with two height options Exclusive Artisan™ basket in hand woven banana leaf highlighting the coloration of the natural fibers; durable woven handles make it an easy tote for moving plants from place to place Exclusive Sandstone™ planter: a versatile, neutral container with ribbed border detail at rim and contoured base; break-resistant and watertight Large plant measures overall approximately 39-40\"H x 9.5\"D potted at the time of purchase Medium plant measures overall approximately 16-20\"H x 6\"D potted at the time of purchase",
                                "id": "dd83e10d-dcf5-44a1-8579-8c4099a500bf",
                                "category": [
                                    "Beginner plants",
                                    "Pet friendly"
                                ]
                            },
                            {
                                "image": "https://www.plants.com/images/r_400_157646MA_20220329-1648582013950.webp",
                                "quantity": 4,
                                "price": 4,
                                "name": "Cypress Snake plant For inside",
                                "description": "snake plant",
                                "id": "b0df9902-eeff-4ac7-af2b-13af6982718e",
                                "category": [
                                    "Beginner plants"
                                ]
                            }
                        ],
                        "info": {
                            "version": "1.0",
                            "type": "list",
                            "count": 3
                        }
                    }
            });
        });

        cy.get('a').contains('Sellers').click().wait(100);
        cy.get('#mat-mdc-checkbox-1-input').click().wait(100);
        cy.get('#mat-mdc-checkbox-1-input').should('be.checked');
        cy.get('#interestsCards').find('#individualInterestCards').find('h3').contains('Cypress Prayer Plant').should('be.visible');
    });
});
