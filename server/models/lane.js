import mongoose from 'mongoose';
import Note from './note';

const Schema = mongoose.Schema;
mongoose.plugin(schema => { schema.options.usePushEach = true; });

const laneSchema = new Schema({
  name: { type: 'String', required: true },
  notes: [{ type: Schema.ObjectId, ref: 'Note', required: true }],
  id: { type: 'String', required: true, unique: true },
});

function populateNotes(next) {
  this.populate('notes');
  next();
}

function removeNotes() {
  const notes = this.notes;
  notes.forEach(note => {
    Note.findByIdAndRemove(note._id).exec();
  });
}

laneSchema.pre('find', populateNotes);
laneSchema.pre('findOne', populateNotes);
laneSchema.post('remove', removeNotes);

export default mongoose.model('Lane', laneSchema);
