import PostModel from '../models/Post.js'

export default {

  getLastTags: async (req, res) => {
    try {
      const posts = await PostModel.find().limit(5).exec();

      const tags = posts.map(obj => obj.tags
      );
      res.json(Array.from(new Set(tags)).slice(0, 5))
    } catch (err) {
      res.status(500).json({
        message: 'failed getting tags',
      })
    }

  },

  getAll: async (req, res) => {
    try {
      const posts = await PostModel.find().populate('user').exec();

      res.json(posts)
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: 'failed getting posts',
      })
    }

  },

  getOne: async (req, res) => {
    try {
      const postId = req.params.id;
      const data = await PostModel.findOneAndUpdate({
          _id: postId,
        },
        {
          $inc: {viewsCount: 1}
        },
        {
          returnDocument: 'after',
        },
      );


      // (err, doc) => {
      //   if (err) {
      //     console.log(err);
      //     return res.status(500).json({
      //       message: 'failed getting the post',
      //     })
      //   }
      //
      //   if (!doc) {
      //     return res.status(404).json({
      //       message: 'Post not found',
      //     })
      //   }
      //
      //   res.json(doc)
      // }
      res.json(data)
    } catch (err) {

      console.log(err);
      res.status(500).json({
        message: 'failed getting posts',
      })
    }

  },

  remove: async (req, res) => {
    try {
      const postId = req.params.id;


      const data = await PostModel.findOneAndDelete({
        _id: postId,
      })

      if (!data) {
        return res.status(404).json({message: "asjas"})
      }

      res.status(200).json({
        success: true
      })
    } catch (err) {
      //console.log(err);
      res.status(500).json({
        message: 'failed getting posts!!!',
      })
    }

  },

  update: async (req, res) => {
    try {
      const postId = req.params.id;

      await PostModel.findOneAndUpdate({
        _id: postId,
      }, {
        title: req.body.title,
        text: req.body.text,
        imageUrl: req.body.imageUrl,
        user: req.userId,
        tags: req.body.tags.split(','),
      });

      res.json({
        success: true
      })

    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: 'Failed topic updating '
      })
    }
  },

  create: async (req, res) => {

    try {
      const doc = new PostModel({
        title: req.body.title,
        text: req.body.text,
        imageUrl: req.body.imageUrl,
        tags: req.body.tags.split(','),
        user: req.userId,
      });

      const post = await doc.save();
      res.json(post)
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: 'post creating failed'
      })
    }
  },
}