CREATE (u1:User {id: "user1"}), (u2:User {id: "user2"}), (u3:User {id: "user3"})
CREATE (p1:Product {id:"product1"}), (p2:Product {id:"product2"}), (p3:Product {id:"product3"}), (p4:Product {id:"product4"}), (p5:Product {id:"product5"})
CREATE (u1)-[:BOUGHT]->(p1)
CREATE (u1)-[:BOUGHT]->(p2)
CREATE (u2)-[:BOUGHT]->(p1)
CREATE (u2)-[:BOUGHT]->(p2)
CREATE (u2)-[:BOUGHT]->(p3)
CREATE (u3)-[:BOUGHT]->(p2)
CREATE (u3)-[:BOUGHT]->(p4)
CREATE (u3)-[:BOUGHT]->(p5)
CREATE (u3)-[:REVIEWED {rating: 4}]->(p2)
CREATE (u3)-[:REVIEWED {rating: 2}]->(p4)
CREATE (u3)-[:REVIEWED {rating: 5}]->(p5)