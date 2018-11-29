export default (
  title: string,
  description: string,
  fields: any,
  color: string,
) => ({
  attachments: [
    {
      author_name: 'Cloud Observer',
      pretext: description,
      text: title,
      fields,
      color,
    },
  ],
});
