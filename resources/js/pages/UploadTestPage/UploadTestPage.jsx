import ImageUpload from '../../components/molecules/ImageUpload/ImageUpload';

const UploadTestPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-playfair font-bold text-center mb-8">
          Image Upload Test
        </h1>
        
        <ImageUpload 
          apartmentId={3}
          isPrimary={'1'}
          onUploadSuccess={(image) => alert('Success!')}
        />
      </div>
    </div>
  );
};

export default UploadTestPage;
