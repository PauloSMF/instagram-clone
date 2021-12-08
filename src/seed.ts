/* eslint-disable no-plusplus */
// Seed para popular a base de dados. 'OBS: '65Kcw9LoWXhqLGDd4aMQcMcDe6H2' retirado do usuário criado no Firebase
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function seedDatabase(firebase: any) {
    const users = [
      {
        userId: '65Kcw9LoWXhqLGDd4aMQcMcDe6H2',
        username: 'paulo',
        fullName: 'Paulo Sérgio',
        emailAddress: 'paulo.smf98@gmail.com',
        following: ['2'],
        followers: ['2', '3', '4'],
        dateCreated: Date.now()
      },
      {
        userId: '2',
        username: 'raphael',
        fullName: 'Raffaello Sanzio da Urbino',
        emailAddress: 'raphael@sanzio.com',
        following: [],
        followers: ['65Kcw9LoWXhqLGDd4aMQcMcDe6H2'],
        dateCreated: Date.now()
      },
      {
        userId: '3',
        username: 'dali',
        fullName: 'Salvador Dalí',
        emailAddress: 'salvador@dali.com',
        following: [],
        followers: ['65Kcw9LoWXhqLGDd4aMQcMcDe6H2'],
        dateCreated: Date.now()
      },
      {
        userId: '4',
        username: 'orwell',
        fullName: 'George Orwell',
        emailAddress: 'george@orwell.com',
        following: [],
        followers: ['65Kcw9LoWXhqLGDd4aMQcMcDe6H2'],
        dateCreated: Date.now()
      }
    ];
  
    // eslint-disable-next-line prefer-const
    for (let k = 0; k < users.length; k++) {
      firebase.firestore().collection('users').add(users[k]);
    }
  
    // eslint-disable-next-line prefer-const
    for (let i = 1; i <= 5; ++i) {
      firebase
        .firestore()
        .collection('photos')
        .add({
          photoId: i,
          userId: '2',
          imageSrc: `/images/users/raphael/${i}.jpg`,
          caption: 'Saint George and the Dragon',
          likes: [],
          comments: [
            {
              displayName: 'dali',
              comment: 'Love this place, looks like my animal farm!'
            },
            {
              displayName: 'orwell',
              comment: 'Would you mind if I used this picture?'
            }
          ],
          userLatitude: '40.7128°',
          userLongitude: '74.0060°',
          dateCreated: Date.now()
        });
    }
  }