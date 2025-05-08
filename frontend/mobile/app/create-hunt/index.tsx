import { View, Text, TextInput, Button } from 'react-native';
import { useState } from 'react';

export default function CreateHuntScreen() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = () => {
    // Appel à l’API pour créer une chasse
    console.log('Chasse créée :', { title, description });
  };

  return (
    <View style={{ padding: 16 }}>
      <Text>Titre de la chasse</Text>
      <TextInput value={title} onChangeText={setTitle} placeholder="Entrer un titre" />
      
      <Text>Description</Text>
      <TextInput value={description} onChangeText={setDescription} placeholder="Décrire la chasse" multiline />
      
      <Button title="Créer la chasse" onPress={handleSubmit} />
    </View>
  );
}
