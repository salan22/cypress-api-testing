import { users } from './users'

const email = Cypress.env('email')
const password = Cypress.env('password')

describe('regres test spec', () => {
  context ('LOGIN test', () => {
    it('LOGIN - TC1 - the standard user can login succesfully', () => {
      cy.login(email, password).then( (token) => {
        cy.log(token)
      })
    })
  
    it ('LOGIN - TC2 - Non existing user meet error when attempt to login', () => {
      const expectedError = "user not found"
      cy.login("yen.dinh@testing", "Welcome!").then ( (error) => {
        expect(error).to.equal(expectedError)
      })
    })
  })  

  context ('GET/POST/PUT/DELETE Test', () => {
    beforeEach ( () => {
      cy.login(email, password).then( (token) => {
        cy.wrap(token).as('authToken') //Save the token as alias
      })
    })

    it ('CREATE USER - TC3 - Should be able to create new user (name, job, email) succesffully', () => {
      //Get the token and pass it to the authorization header
      cy.get('@authToken').then((token) => {                
        
        cy.request({
          method: 'POST',
          url: '/api/users',
          headers: {
            'Authorization': `Bearer ${token}`
          }, //pass the Bearer authorization header
          body: {
            name: users[0].name,
            job: users[0].job,
            email: users[0].email
          }
        }).then( (response) => {
          //Verify response status code is 201 
          expect(response.status).to.equal(201)

          const body = response.body;

          //Verify response data
          expect(body.name).to.equal(users[0].name)
          expect(body.job).to.equal(users[0].job)
          expect(body.email).to.equal(users[0].email)

          // Check that 'id' and 'createdAt' exist in the response body
          expect(body).to.have.property('id');
          expect(body).to.have.property('createdAt');
        })
      });
    })

    it ('CREATE USER - TC4 - Should be able to create new user (name, job) succesffully', () => {
      //Get the token and pass it to the authorization header
      cy.get('@authToken').then((token) => {                
        
        cy.request({
          method: 'POST',
          url: '/api/users',
          headers: {
            'Authorization': `Bearer ${token}`
          }, 
          body: {
            name: users[2].name,
            job: users[2].job
          }
        }).then( (response) => {
          //Verify response status code is 201 
          expect(response.status).to.equal(201)

          const body = response.body;

          //Verify response data
          expect(body.name).to.equal(users[2].name)
          expect(body.job).to.equal(users[2].job)

          // Check that 'id' and 'createdAt' exist in the response body
          expect(body).to.have.property('id');
          expect(body).to.have.property('createdAt');
        })
      });
    })

    it ('CREATE USER - TC5 - Error when the name field is missing', () => {
      //Get the token and pass it to the authorization header
      cy.get('@authToken').then((token) => {                
        
        cy.request({
          method: 'POST',
          url: '/api/users',
          headers: {
            'Authorization': `Bearer ${token}`
          }, 
          body: {
            job: users[6].job
          }
        }).then( (response) => {
          //Verify response status code is 400
          expect(response.status).to.equal(400)
        })
      });
    })

    it ('GET USER - TC6 - Should be able get the detail of existing user', () => {
      //Get the token and pass it to the authorization header
      cy.get('@authToken').then((token) => {                     
        
        cy.request({
          method: 'GET',
          url: `/api/users/${users[7].id}`,
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }).then( (response) => {
          //Verify response status code is 200 
          expect(response.status).to.equal(200)

          const body = response.body;

          //Verify response data
          expect(body.data.id).to.equal(users[7].id)
          expect(body.data.email).to.equal(users[7].email)
          expect(body.data.first_name).to.equal(users[7].first_name)
          expect(body.data.last_name).to.equal(users[7].last_name)
          expect(body.data.avatar).to.equal(users[7].avatar)
        })
      });
    })

    it ('GET USER - TC7 - Should see error 404 when retreiving not existing user', () => {
      //Get the token and pass it to the authorization header
      cy.get('@authToken').then((token) => {                     
        
        cy.request({
          method: 'GET',
          url: '/api/users/999',
          headers: {
            'Authorization': `Bearer ${token}`
          },
          failOnStatusCode: false
        }).its('status').should('eq', 404)
      });
    })

    it ('GET USER - TC8 - Response time of the request to be less than 3 second', () => {
      //Get the token and pass it to the authorization header
      cy.get('@authToken').then((token) => {   
        const startTime = new Date().getTime();                  
        
        cy.request({
          method: 'GET',
          url: '/api/users/2',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }).then( (response) => {
          //Verify response status code is 200
          expect(response.status).to.equal(200)

          const endTime = new Date().getTime();
          const responseTime = endTime - startTime;

          cy.log('Response Time:', responseTime + ' ms');
          
          expect(responseTime).to.be.lessThan(3000); // Assert that response time is less than 2000 ms (2 seconds)
        })
      });
    })

    it ('UPDATE USER - TC9 - Should be able to update user succesffully', () => {      
      cy.get('@authToken').then((token) => {                        
        cy.request({
          method: 'PUT',
          url: `/api/users/${users[1].id}`,
          headers: {
            'Authorization': `Bearer ${token}`
          }, 
          body: {
            name: users[1].name,
            job: users[1].job,
            email: users[1].email
          }
        }).then( (response) => {
          //Verify response status code is 200
          expect(response.status).to.equal(200)

          const body = response.body;

          //Verify response data
          expect(body.name).to.equal(users[1].name)
          expect(body.job).to.equal(users[1].job)
          expect(body.email).to.equal(users[1].email)

          // Check that 'updatedAt' exist in the response body
          expect(body).to.have.property('updatedAt');
        })
      });
    })

    it ('UPDATE USER - TC10 - Should be able to update user (job field) succesffully', () => {      
      cy.get('@authToken').then((token) => {                        
        cy.request({
          method: 'PUT',
          url: `/api/users/${users[3].id}`,
          headers: {
            'Authorization': `Bearer ${token}`
          }, 
          body: {
            job: users[3].job,
          }
        }).then( (response) => {
          //Verify response status code is 200
          expect(response.status).to.equal(200)

          const body = response.body;

          //Verify response data
          expect(body.job).to.equal(users[3].job)

          // Check that 'updatedAt' exist in the response body
          expect(body).to.have.property('updatedAt');
        })
      });
    })

    it ('UPDATE USER - TC11 - Should see error bad request when body is empty', () => {      
      cy.get('@authToken').then((token) => {                        
        cy.request({
          method: 'PUT',
          url: `/api/users/${users[3].id}`,
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }).then( (response) => {
          //Verify response status code is 400
          expect(response.status).to.equal(400)
          
        })
      });
    })

    it ('DELETE USER - TC12 - Should be able to delete existing user', () => {      
      cy.get('@authToken').then((token) => {                        
        cy.request({
          method: 'DELETE',
          url: `/api/users/2`,
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }).then( (response) => {
          expect(response.status).to.equal(204)      
        })
      });
    })

    it ('DELETE USER - TC13 - Should see error when deleting non-existing user', () => {      
      cy.get('@authToken').then((token) => {                        
        cy.request({
          method: 'DELETE',
          url: '/api/users/non-existing-user',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }).then( (response) => {
          expect(response.status).to.equal(400)      //Test failed because the API always return success code
        })
      });
    })

    it ('DELETE USER - TC14 - Response time of the request to be less than 3 second', () => {
      //Get the token and pass it to the authorization header
      cy.get('@authToken').then((token) => {   
        const startTime = new Date().getTime();                  
        
        cy.request({
          method: 'DELETE',
          url: '/api/users/2',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }).then( (response) => {
          expect(response.status).to.equal(204)

          const endTime = new Date().getTime();
          const responseTime = endTime - startTime;

          cy.log('Response Time:', responseTime + ' ms');
          
          expect(responseTime).to.be.lessThan(3000); // Assert that response time is less than 2000 ms (2 seconds)
        })
      });
    })
  })

  context ("End2End test - TC15 - user management case", () => {
    let userId;

    beforeEach( () => {
      cy.login(email, password).then( (token) => {
        cy.wrap(token).as('authToken')
      })
    })

    it ('Should create new user', () => {
      cy.get('@authToken').then((token) => {                
        
        cy.request({
          method: 'POST',
          url: '/api/users',
          headers: {
            'Authorization': `Bearer ${token}`
          }, //pass the Bearer authorization header
          body: {
            name: users[4].name,
            job: users[4].job,
            email: users[4].email
          }
        }).then( (response) => {
          //Verify response status code is 201 
          expect(response.status).to.equal(201)

          const body = response.body;

          //Verify response data
          expect(body.name).to.equal(users[4].name)
          expect(body.job).to.equal(users[4].job)
          expect(body.email).to.equal(users[4].email)

          // Check that 'id' and 'createdAt' exist in the response body
          expect(body).to.have.property('id');
          expect(body).to.have.property('createdAt');

          // Store the user ID for later use
          userId = response.body.id;
          cy.log(userId)
        })
      });
    })

    it ('Should retreive the user', () => {
      cy.get('@authToken').then((token) => {                     
        
        cy.request({
          method: 'GET',
          url: `/api/users/${userId}`,
          headers: {
            'Authorization': `Bearer ${token}`
          },
          failOnStatusCode: false
        }).then( (response) => {
          //Verify response status code is 200 
          expect(response.status).to.equal(200)

          const body = response.body;

          //Verify response data
          expect(body.data.id).to.equal(users[7].id)
          expect(body.data.email).to.equal(users[7].email)
          expect(body.data.name).to.equal(users[7].first_name)
        })
      }); 
    })

    it ('Should update user', () => {
      cy.get('@authToken').then((token) => {                     
        cy.request({
          method: 'PUT',
          url: `/api/users/${userId}`,
          headers: {
            'Authorization': `Bearer ${token}`
          },
          body: {
            job: "CEO"
          },
          failOnStatusCode: false
        }).then( (response) => {
          //Verify response status code is 200 
          expect(response.status).to.equal(200)

          const body = response.body;

          //Verify response data
          expect(body.job).to.equal("CEO")
        })
      }); 
    })

    it ('Should delete user', () => {
      cy.get('@authToken').then((token) => {                     
        cy.request({
          method: 'DELETE',
          url: `/api/users/${userId}`,
          headers: {
            'Authorization': `Bearer ${token}`
          },
          failOnStatusCode: false
        }).then( (response) => {
          //Verify response status code
          expect(response.status).to.equal(204)
        })
      }); 
    })

    it ('Should meet error while retreiving deleted user', () => {
      cy.get('@authToken').then((token) => {                     
        cy.request({
          method: 'GET',
          url: `/api/users/${userId}`,
          headers: {
            'Authorization': `Bearer ${token}`
          },
          failOnStatusCode: false
        }).then( (response) => {
          //Verify response status code
          expect(response.status).to.equal(404)
        })
      }); 
    })
  })

  context ("End2End test - TC16 - get user from list then update user", () => {
    let user;
    let updatedUser = { 
      name: "George Bluth",
      job: "Software Developer"};

    beforeEach( () => {
      cy.login(email, password).then( (token) => {
        cy.wrap(token).as('authToken')
      })
    })

    it ('Should retreive the first page from the list of user', () => {
      cy.get('@authToken').then((token) => {                        
        cy.request({
          method: 'GET',
          url: '/api/users?page=1',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }).then( (response) => {
          expect(response.status).to.equal(200)

          const body = response.body;

          expect(body.data.length).to.equal(6)

          expect(body.data[0].id).to.equal(1)
          expect(body.data[0].email).to.equal('george.bluth@reqres.in')
          expect(body.data[0].first_name).to.equal('George')
          expect(body.data[0].last_name).to.equal('Bluth')

          user = body.data[0] //assign the first user      
        })
      });
    })

    it ('Should be able to update the first record', () => {
      cy.get('@authToken').then((token) => {                        
        cy.request({
          method: 'PUT',
          url: `/api/users/${user.id}`,
          headers: {
            'Authorization': `Bearer ${token}`
          },
          body: updatedUser
        }).then( (response) => {
          expect(response.status).to.equal(200)

          const body = response.body;

          expect(body.name).to.equal(updatedUser.name)
          expect(body.job).to.equal(updatedUser.job)
        })
      });
    })

    it ('Should be able retreive user information after updated', () => {
      cy.get('@authToken').then((token) => {                        
        cy.request({
          method: 'GET',
          url: `/api/users/${user.id}`,
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }).then( (response) => {
          expect(response.status).to.equal(200)

          const body = response.body;

          expect(body.name).to.equal(updatedUser.name)
          expect(body.job).to.equal(updatedUser.job)
        })
      });
    })
  })
})