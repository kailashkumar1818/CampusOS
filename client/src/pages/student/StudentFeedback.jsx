import React, { useState } from 'react';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';
import Button from '../../components/common/Button';
import { Star, CheckCircle2 } from 'lucide-react';

const StudentFeedback = () => {
  const [submitted, setSubmitted] = useState(false);
  const [ratings, setRatings] = useState({
    clarity: 5,
    coverage: 5,
    engagement: 4,
    punctuality: 5,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-2 border-b border-slate-200 dark:border-surface-800">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-slate-800 dark:text-slate-100 uppercase font-mono">
            COURSE & FACULTY TEACHING EVALUATION (FEEDBACK)
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Anonymous institutional quality assurance survey for semester courses
          </p>
        </div>
      </div>

      {submitted ? (
        <Card>
          <div className="text-center py-10 space-y-2">
            <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto" />
            <h3 className="text-base font-bold text-slate-900">Evaluation Submitted Successfully!</h3>
            <p className="text-xs text-slate-500">Thank you for helping maintain high academic standards.</p>
          </div>
        </Card>
      ) : (
        <Card title="Faculty Teaching Feedback - Dr. Robert Johnson" subtitle="CS301 - Data Structures and Algorithms">
          <form onSubmit={handleSubmit} className="space-y-5 text-xs">
            <div className="p-3 bg-slate-50 rounded-lg text-slate-600">
              Your feedback is completely anonymous. Individual responses are not disclosed to professors.
            </div>

            <div>
              <label className="block font-bold text-slate-800 mb-2">1. Clarity of Concepts & Algorithmic Explanations</label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRatings({ ...ratings, clarity: star })}
                    className={`p-2 rounded border text-xs font-bold ${
                      ratings.clarity >= star ? 'bg-amber-400 text-white border-amber-500' : 'bg-white text-slate-600'
                    }`}
                  >
                    ★ {star}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-800 mb-2">2. Punctuality & Lecture Syllabus Coverage</label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRatings({ ...ratings, coverage: star })}
                    className={`p-2 rounded border text-xs font-bold ${
                      ratings.coverage >= star ? 'bg-amber-400 text-white border-amber-500' : 'bg-white text-slate-600'
                    }`}
                  >
                    ★ {star}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-800 mb-1">Additional Constructive Remarks (Optional)</label>
              <textarea
                rows={3}
                placeholder="Share any comments on lab assistance or assignment difficulty..."
                className="w-full p-2.5 rounded border border-slate-300 text-xs"
              />
            </div>

            <Button variant="primary" size="md" type="submit">
              Submit Anonymous Course Feedback
            </Button>
          </form>
        </Card>
      )}
    </div>
  );
};

export default StudentFeedback;

